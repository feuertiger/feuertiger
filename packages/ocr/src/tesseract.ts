/* eslint-disable no-param-reassign */
import { createWorker, createScheduler } from 'tesseract.js';

// eslint-disable-next-line import/prefer-default-export
export const ocr = async (image: string): Promise<string> => {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data } = await worker.recognize(image);
    await worker.terminate();
    const { text } = data;
    return text;
};

export const startOcr = async (
    video: HTMLVideoElement,
    handleData: (data: string) => void
): Promise<() => void> => {
    const scheduler = createScheduler();
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('deu');
    await worker.initialize('deu');
    scheduler.addWorker(worker);

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const canvasContext = canvas?.getContext('2d');

    const doOCR = async (): Promise<string> => {
        canvasContext?.drawImage(
            video,
            0,
            0,
            video.videoWidth,
            video.videoWidth
        );
        const result = await scheduler.addJob('recognize', canvas);
        const {
            data: { text }
        } = result;
        return text as string;
    };

    let performOcr = true;

    const startOCR = async () => {
        const text = await doOCR();
        handleData(text);
    };

    const stopOCR = () => {
        performOcr = false;
        worker.terminate();
        canvas.remove();
    };

    (async () => {
        while (performOcr) {
            // eslint-disable-next-line no-await-in-loop
            await startOCR();
            // eslint-disable-next-line no-await-in-loop
            await new Promise((resolve) => setTimeout(resolve, 250));
        }
    })();

    return stopOCR;
};
