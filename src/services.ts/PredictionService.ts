import axios from "axios";

/**
 * 🔹 ตั้งค่า BASE_URL เป็น IP เครื่องที่รัน backend
 *    - ถ้าใช้มือถือจริง: ใช้ IP ของคอมในวง Wi-Fi เดียวกัน เช่น "http://192.168.1.10:8000"
 *    - ถ้ารันใน Emulator (Android): ใช้ "http://10.0.2.2:8000"
 *    - ถ้าใช้ Expo Go ในมือถือ: ต้องใช้ IP จริงของคอมด้วย
 */
const BASE_URL = "http://10.0.0.48"; 

/**
 * 🔹 ฟังก์ชัน predictImage
 * ส่งภาพไปยัง backend เพื่อให้โมเดล (.pkl) ทำนาย
 * แล้วคืนค่าผลลัพธ์กลับมา
 */
export const PredictionService = async (imageUri: string) => {
  try {
    // เตรียมข้อมูลภาพเป็น FormData
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);

    // ส่งภาพไปยัง API /predict (FastAPI route)
    const response = await axios.post(`${BASE_URL}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;

  } catch (error: any) {
    console.error("Prediction error:", error.message);
    throw new Error("ไม่สามารถทำนายภาพได้ โปรดลองอีกครั้ง");
  }
};

/**
 * 🔹 ฟังก์ชันทดสอบการเชื่อมต่อ API
 * (ใช้ตอนแรกเพื่อเช็กว่า backend ออนไลน์ไหม)
 */
export const testConnection = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    console.log("Connected to backend:", response.data);
  } catch (error) {
    console.error("❌ ไม่สามารถเชื่อมต่อ backend ได้");
  }
};
