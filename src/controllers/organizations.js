const organizationService = require("../services/organizations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jwt for cookie handling

const login = async (req, res) => {
  const { orgId, password } = req.body;
  try {
    const organization = await organizationService.getOne({ oid: orgId });
    if (organization) {
      const isMatch = await bcrypt.compare(password, organization.password);
      if (isMatch) {
        // Generate a token and store it in the cookie
        const token = jwt.sign(
          {
            id: organization._id,
            oid: organization.oid,
            name: organization.name,
          },
          process.env.JWT_SECRET || 'your_jwt_secret',
          { expiresIn: "1h" }
        );
        res.cookie('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
        return res.json(organization);
      }
    }
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createUser = async (req, res) => {
  const { orgId, orgName, password } = req.body;

  console.log("🚀 ~ file: organizations.js:34 ~ createUser ~ { oid, name, password }:", { orgId, orgName, password });

  try {
    const existingOrg = await organizationService.getOne({ oid: orgId });
    if (existingOrg) {
      return res.status(400).json({ message: "Organization already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const organization = await organizationService.add({
      oid: orgId,
      name: orgName,
      password: hashedPassword,
    });

    // Generate a token and store it in the cookie
    const token = jwt.sign(
      { id: organization._id, oid: organization.oid, name: organization.name },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    res.cookie("authToken", token, { httpOnly: true });

    res
      .status(201)
      .json({ message: "Organization created successfully", organization });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  createUser,
};
