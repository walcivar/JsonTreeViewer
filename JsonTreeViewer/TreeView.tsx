import React, { useState } from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button'; // Import Fluent UI PrimaryButton
import { IconButton } from '@fluentui/react/lib/Button'; // Import IconButton
import { TreeNode } from './types';

interface TreeViewProps {
    data: TreeNode[];
    onActionClick: (node: TreeNode) => void;
}

interface TreeNodeProps {
  node: TreeNode;
  onActionClick: (node: TreeNode) => void;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, onActionClick }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };

  const handleActionClick = () => {
    onActionClick(node);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          iconProps={{ iconName: isExpanded ? 'ChevronUp' : 'ChevronDown' }}
          onClick={handleToggle}
          style={{ marginRight: '10px' }}
        />
        {node.name} - {node.id} - {node.type}
        <PrimaryButton
          onClick={handleActionClick}
          style={{
            marginLeft: '10px',
            marginBottom: '10px',
          }}>View Description</PrimaryButton>
      </div>
      {isExpanded && node.children && (
        <div style={{ marginLeft: "20px" }}>
          {node.children.map((child) => (
            <TreeNodeComponent key={child.id} node={child} onActionClick={onActionClick} />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView: React.FC<TreeViewProps> = ({ data, onActionClick }) => (
  <div>
    {data.map((node) => (
      <TreeNodeComponent key={node.id} node={node} onActionClick={onActionClick} />
    ))}
  </div>
);

export default TreeView;