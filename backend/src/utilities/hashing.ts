import bcrypt from "bcryptjs";

export async function DoHash(password: string, saltRounds: number) {
  const generatedSalt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, generatedSalt);
  return hashedPassword;
}

export async function DoCompare(password:string,hashedPassword:string) {
    const res= await bcrypt.compare(password,hashedPassword);
    return res;
}