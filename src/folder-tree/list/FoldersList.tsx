import React from 'react';
import { Folder } from '../../store/FoldersService';
import { FolderItem } from '../item/FolderItem';

interface Props {
    folders: Folder[];
    query: string;
    level: number;
}

const FOLDER_PADDING = 25;

export const FoldersList: React.FC<Props> = ({ folders, level, query }) => {
    return (
        <div data-cy="folder-list" style={{ paddingLeft: level === 0 ? 0 : FOLDER_PADDING }}>
            {folders.map((folder) => (
                <div key={folder.name}>
                    <FolderItem name={folder.name} id={folder.id} query={query} />
                    <FoldersList folders={folder.subFolders} level={level + 1} query={query} />
                </div>
            ))}
        </div>
    );
};
