import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

async function validateAdmin(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('validateAdmin Error:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

export default validateAdmin;
