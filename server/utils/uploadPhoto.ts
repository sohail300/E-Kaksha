import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import storage from "../db/firebase";

export async function uploadPhoto(
  id: string,
  file: any,
  address: string
): Promise<string> {
  try {
    const storageRef = ref(storage, address + id);
    console.log(storageRef);

    const contentType = "image/png";
    const uploadTask: UploadTask = uploadBytesResumable(
      storageRef,
      file.buffer,
      { contentType }
    );
    console.log(uploadTask);

    // Create a promise that resolves when the upload is complete
    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading file:", error);
          reject(error);
        },
        () => {
          console.log("File uploaded successfully");
          resolve();
        }
      );
    });

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    console.log("File available at", downloadURL);
    return downloadURL;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error so it can be caught by the caller
  }
}
