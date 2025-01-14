import { TOTP } from "totp-generator";

export function xorEncryptDecrypt(
  data: string,
  key: string,
  isEncrypt: boolean = true,
): string {
  // Step 1: If decrypting, decode the Base64 input
  const inputData: string = isEncrypt ? data : atob(data);

  // Step 2: Repeat the key to match the length of the input data
  const repeatedKey: string = key
    .repeat(Math.ceil(inputData.length / key.length))
    .slice(0, inputData.length);

  // Step 3: XOR each character of the input data with the repeated key
  const result: string = Array.from(inputData)
    .map((char, index) =>
      String.fromCharCode(char.charCodeAt(0) ^ repeatedKey.charCodeAt(index)),
    )
    .join("");

  // Step 4: If encrypting, encode the result in Base64
  return isEncrypt ? btoa(result) : result;
}

export const generateTOTP = (): string => {
  try {
    const SECRET = import.meta.env.VITE_APP_TOTP_SECRET;
    const { otp } = TOTP.generate(SECRET, {
      digits: 6,
      algorithm: "SHA-1",
      period: 60,
    });
    return otp;
  } catch (error) {
    throw new Error("Failed to generate TOTP");
  }
};

export const encryptMessage = (message: string, key: string): string => {
  try {
    return xorEncryptDecrypt(message, key, true);
  } catch (error) {
    throw new Error("Failed to encrypt message");
  }
};
