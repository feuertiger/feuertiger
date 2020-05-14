// import firebase from 'firebase/app';
// @ts-ignore
import vision from '@google-cloud/vision';

// TODO fix web import problem

// eslint-disable-next-line import/prefer-default-export
export const visionOCR = async (image: string): Promise<any> => {
    // TODO upload image to firebase storage

    // Create a root reference
    // const storageRef = firebase.storage();

    // eslint-disable-next-line global-require

    // Imports the Google Cloud client library

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    // TODO implementd usecase specific detection and return objects
    const [result] = await client.labelDetection(image);
    const labels = result.labelAnnotations;
    if (labels) {
        // console.log('Labels:');
        // eslint-disable-next-line no-console
        labels.forEach((label: any) => console.log(label.description));
    }

    // TODO remove image from firebase storage

    return '';
};
