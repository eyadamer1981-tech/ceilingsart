
import connectDB from '../src/lib/mongodb';
import { Blog } from '../src/lib/models';
import { generateSlug } from '../src/lib/seo-utils';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

console.log('Env keys:', Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('DB') || k.includes('URL')));

async function run() {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected.');

    if (mongoose.connection.db) {
        console.log('Database Name:', mongoose.connection.db.databaseName);
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
    }
    console.log('Models:', mongoose.modelNames());

    // Explicitly check collection 'blogs'
    const count = await mongoose.connection.db?.collection('blogs').countDocuments();
    console.log('Direct count from "blogs" collection:', count);

    const blogs = await Blog.find({});
    console.log(`Found ${blogs.length} blogs.`);

    for (const blog of blogs) {
        if (!blog.title) continue;

        const newSlugBase = generateSlug(blog.title);
        let newSlug = newSlugBase;
        let counter = 1;

        // Check for collision with OTHER blogs
        // Note: We're doing this sequentially, which is fine for a script
        // We check against DB, but if we updated one in this loop, we need to be careful.
        // Actually, checking DB is fine because we await save immediately.
        while (await Blog.findOne({ slug: newSlug, _id: { $ne: blog._id } })) {
            newSlug = `${newSlugBase}-${counter}`;
            counter++;
        }

        if (newSlug !== blog.slug) {
            console.log(`Updating slug: "${blog.slug}" -> "${newSlug}" (Title: ${blog.title})`);
            blog.slug = newSlug;
            await blog.save();
        } else {
            console.log(`Slug ok: "${blog.slug}"`);
        }
    }

    console.log('Done.');
    await mongoose.disconnect();
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
