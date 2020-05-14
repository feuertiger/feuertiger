const fs = require('fs');
const { importSchema } = require('graphql-import');

const combine = (src, out) => {
    const path = require.resolve(src);
    const schema = importSchema(path);
    fs.writeFileSync(out, schema, 'utf8');
};

combine('./src/schema/root.graphql', './lib/schema.graphql');
