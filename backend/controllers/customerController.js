import Customer from "../models/customerModel.js";

export const addCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const customerExists = await Customer.findOne({ email });

    if (customerExists) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
      user: req.user._id, // logged-in user id
    });

    res.status(201).json({
      message: " Customer Added Successfully!",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      total: customers.length,
      customers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
