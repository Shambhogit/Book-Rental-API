import Category from "../models/categories.model.js";

async function addCategory(req, res) {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).send({ success: false, message: 'Name and description are required' });
        }

        const isExist = await Category.findOne({ name: name.trim() });
        if (isExist) {
            return res.status(409).send({ success: false, message: 'This category already exists' });
        }

        const newCategory = await Category.create({
            name: name.trim(),
            description: description.trim(),
        });

        return res.status(201).send({
            success: true,
            message: 'Category added successfully',
            data: newCategory,
        });

    } catch (error) {
        console.error('Add Category Error:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

async function getAllCategories(req, res) {
    try {
        const categories = await Category.find();
        return res.status(200).json({success:true, count:categories.length, categories});

    } catch (error) {
        console.error('Add Category Error:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
export {
    addCategory,
    getAllCategories,
}