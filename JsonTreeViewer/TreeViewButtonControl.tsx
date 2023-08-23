import React, { useState } from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button'; // Import Fluent UI PrimaryButton
import { IconButton } from '@fluentui/react/lib/Button'; // Import IconButton
import { Spinner } from '@fluentui/react/lib/Spinner'; // Import Spinner
import Modal from 'react-modal';
import { fetchData } from './api';
import TreeView from './TreeView';
import { IInputs } from "./generated/ManifestTypes";
import { TreeNode } from './types';
import './css/main.css';

export interface TreeViewButtonControlProps {
    context: ComponentFramework.Context<IInputs>;
}

const TreeViewButtonControl: React.FC<TreeViewButtonControlProps> = ({ context }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
    const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const fetchUrl = context.parameters.fetchUrl.raw || "";

    const fetchDataAndOpenModal = async () => {
        setIsLoading(true); // Set isLoading to true while fetching data
        const data = await fetchData(fetchUrl);
        setTreeData(data);
        setModalOpen(true);
        setIsLoading(false); // Set isLoading to false after data is fetched
    };

    const handleActionClick = (node: TreeNode) => {
      setSelectedNode(node);
      setDescriptionModalOpen(true);
  };

  const closeModal = () => {
      setSelectedNode(null);
      setModalOpen(false);
      setDescriptionModalOpen(false);
  };

    return (
        <div>
            {isLoading ? (
                <div className="spinner-overlay">
                    <Spinner label="Loading..." />
                </div>
            ) : (
                <PrimaryButton onClick={fetchDataAndOpenModal}>Open Modal</PrimaryButton>
            )}            
            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="modal" overlayClassName="modal-overlay">
                <IconButton
                    iconProps={{ iconName: 'Cancel' }}
                    onClick={() => setModalOpen(false)}
                    styles={{ root: { position: 'absolute', top: '10px', right: '10px' } }}
                />
                <TreeView data={treeData} onActionClick={handleActionClick} />
            </Modal>
            <Modal isOpen={descriptionModalOpen} onRequestClose={() => setDescriptionModalOpen(false)} className="description-modal" overlayClassName="description-modal-overlay">
                <div className="description-modal-content">
                    {selectedNode && (
                        <div>
                            <IconButton
                                iconProps={{ iconName: 'Cancel' }}
                                onClick={() => setDescriptionModalOpen(false)}
                                styles={{ root: { position: 'absolute', top: '10px', right: '10px' } }}
                            />
                            <h3>Description:</h3>
                            <p>{selectedNode.description}</p>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default TreeViewButtonControl;