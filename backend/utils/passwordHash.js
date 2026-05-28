import bcrypt from "bcrypt";

async function passwordHash(password) {
    return await bcrypt.hash(password, 10);
}

export default passwordHash;