const { GetObjectCommand, S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: "AKIAYHVZCZWEVGP6TCBQ",
        secretAccessKey: "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",
    }
});


async function getObjectUrl(key) {
    const command = new GetObjectCommand({
        Bucket: 'speakupmedia',
        Key: key,
    })
    // set expiry to 1 day

    const url = await getSignedUrl(s3Client, command, { expiresIn: 86400});
    return url;
}

async function putObjectUrl(fileName, contentType) {
    const command = new PutObjectCommand({
        Bucket: 'speakupmedia',
        Key: fileName,
        ContentType: contentType,
    })
   const url = await getSignedUrl(s3Client, command,  { expiresIn: 86400});
   return url;
}
module.exports = {
    getObjectUrl,
    putObjectUrl
};