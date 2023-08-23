export interface TreeNode {
    name: string;
    type: string;
    id: string;
    description: string;
    children?: TreeNode[];
}