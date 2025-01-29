// Import required dependencies
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

// Initialize the Prisma client
const prisma = new PrismaClient();

/**
 * Function to update the password for a user
 * @param {string} email - The email of the user whose password needs to be updated
 * @param {string} newPassword - The new password to set for the user
 */
const updatePassword = async (email, newPassword) => {
    const saltRounds = 10;  // Number of salt rounds for bcrypt hashing
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);  // Hash the new password

    // Update the user's password in the database
    await prisma.user.update({
        where: { email: email },  // Find user by email
        data: { mdp: hashedPassword },  // Set the new hashed password
    });

    console.log(`Password updated for user ${email}`);  // Log the password update success
};

// Update the password for the user with email 'jean.dupont@example.com'
updatePassword('jean.dupont@example.com', 'password123');

// Update the password for the user with email 'marie.martin@example.com'
updatePassword('marie.martin@example.com', 'securepass456');
