// import firebase from 'firebase/app';
import vision from '@google-cloud/vision';

// TODO fix web import problem

export const visionOCR = async (image: string): Promise<string> => {
    // TODO upload image to firebase storage

    // Create a root reference
    // const storageRef = firebase.storage();

    // eslint-disable-next-line global-require

    // Imports the Google Cloud client library

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    // TODO implement use case specific detection and return objects
    const [result] = await client.labelDetection(image);
    const labels = result.labelAnnotations;
    if (labels) {
        // console.log('Labels:');
        // eslint-disable-next-line no-console
        labels.forEach(({ description }) => console.log(description));
    }

    // TODO remove image from firebase storage

    return '';
};
