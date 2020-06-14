import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { List, ListItem, ListItemText } from '@material-ui/core';

export interface FileInfoProps {
    file: File | null | undefined;
    handleChangeDropzone: (files: File[]) => void | Promise<void>;
}

export const FileInfo = (props: FileInfoProps) => {
    const { file, handleChangeDropzone } = props;
    return file ? (
        <List>
            <ListItem>
                <ListItemText primary="Name" secondary={file.name} />
            </ListItem>
            <ListItem>
                <ListItemText primary="Size" secondary={`${file.size} byte`} />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Type"
                    secondary={file.type || 'unknown'}
                />
            </ListItem>
        </List>
    ) : (
        <DropzoneArea
            onChange={handleChangeDropzone}
            dropzoneText="Select File"
            acceptedFiles={['.csv', '.pdf']}
            fileObjects={[]}
            filesLimit={1}
        />
    );
};
