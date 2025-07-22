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
        return res.status(200).json({ success: true, count: categories.length, categories });

    } catch (error) {
        console.error('get Category Error:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

// async function updateCategory(req, res) {
//     try {
//         const { name, description } = req.body;

//     } catch (error) {
//         console.error('Update Category Error:', error);
//         return res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
// }

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid Category ID format' });
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        await Category.deleteOne({ _id: id }); 

        return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export {
    addCategory,
    getAllCategories,
    // updateCategory,
    deleteCategory,
}