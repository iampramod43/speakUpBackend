const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Function to register schemas
const registerSchemas = () => {
  const schemasDir = path.join(__dirname, 'src/models');

  // Get list of schema files
  const schemaFiles = fs.readdirSync(schemasDir);

  // Iterate over each schema file and register it with Mongoose
  schemaFiles.forEach(file => {
    if (file.endsWith('.js')) {
      const schema = require(path.join(schemasDir, file));
      mongoose.model(schema.modelName, schema.schema);
    }
  });

  console.log('Schemas registered successfully.');
};

module.exports = registerSchemas;
