export interface ExtractorOptions {
    rowSeprator: string;
    colSeperator: string | null | undefined;
    rowLength: number | null | undefined;
    cleaningRules: Array<any>;
}

const createEmptyData = (rowCount: number, rowLength: number): string[][] =>
    Array.from<void, string[]>({ length: rowCount }, () =>
        Array.from<void, string>({ length: rowLength }, () => '')
    );

export class RawDataStructure {
    private options: ExtractorOptions;

    public file: File;

    public rawText: string = '';

    public cleanText: string = '';

    public flattData: string[][] = [];

    constructor(options: ExtractorOptions) {
        this.options = options;
    }

    public setOptions(options: ExtractorOptions) {
        this.options = options;
    }

    public async load(file: File) {
        this.file = file;
        this.rawText = await file.text();
    }

    public async clean() {
        this.cleanText = this.rawText;
    }

    public async parse() {
        const { colSeperator, rowSeprator, rowLength } = this.options;

        if (rowSeprator) {
            const rows = this.cleanText.split(rowSeprator);
            this.flattData = rows.map((row) => row.split(colSeperator));
        } else if (rowLength) {
            const flattCells = this.cleanText.split(colSeperator);
            const rowCount = Math.ceil(flattCells.length / rowLength);

            const data: string[][] = createEmptyData(rowCount, rowLength);

            this.flattData = flattCells.reduce((acc, cell, index) => {
                const rowIndex = index % rowLength;
                const colIndex = (index - rowIndex) / rowLength;
                acc[colIndex][rowIndex] = cell;
                return acc;
            }, data);
        }
    }
}
