const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

// Gmail validation regex
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const renderRegisterPage = (req, res) => {
  if (req.cookies.token) {
    return res.redirect('/dashboard');
  }

  res.render('pages/register', {
    title: 'Register - AI Resume Builder',
    error: null,
    formData: {}
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).render('pages/register', {
        title: 'Register - AI Resume Builder',
        error: 'All fields are required.',
        formData: { name, email }
      });
    }

    // Gmail validation
    if (!gmailRegex.test(email.trim().toLowerCase())) {
      return res.status(400).render('pages/register', {
        title: 'Register - AI Resume Builder',
        error: 'Only Gmail addresses are allowed.',
        formData: { name, email }
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (existingUser) {
      return res.status(400).render('pages/register', {
        title: 'Register - AI Resume Builder',
        error: 'An account with this email already exists.',
        formData: { name, email }
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword
      }
    });

    return res.redirect('/auth/login?registered=true');

  } catch (error) {
    next(error);
  }
};

const renderLoginPage = (req, res) => {
  if (req.cookies.token) {
    return res.redirect('/dashboard');
  }

  const registered = req.query.registered === 'true';

  res.render('pages/login', {
    title: 'Login - AI Resume Builder',
    error: null,
    success: registered
      ? 'Account created successfully! Please log in.'
      : null,
    formData: {}
  });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).render('pages/login', {
        title: 'Login - AI Resume Builder',
        error: 'Please enter both email and password.',
        success: null,
        formData: { email }
      });
    }

    // Gmail validation
    if (!gmailRegex.test(email.trim().toLowerCase())) {
      return res.status(400).render('pages/login', {
        title: 'Login - AI Resume Builder',
        error: 'Only Gmail addresses are allowed.',
        success: null,
        formData: { email }
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      return res.status(401).render('pages/login', {
        title: 'Login - AI Resume Builder',
        error: 'Invalid email or password.',
        success: null,
        formData: { email }
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).render('pages/login', {
        title: 'Login - AI Resume Builder',
        error: 'Invalid email or password.',
        success: null,
        formData: { email }
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET || 'fallback_secret_key',
      {
        expiresIn: '1d'
      }
    );

    // Store token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.redirect('/dashboard');

  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  return res.redirect('/auth/login');
};

module.exports = {
  renderRegisterPage,
  register,
  renderLoginPage,
  login,
  logout
};