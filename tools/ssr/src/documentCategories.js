"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentCategories = void 0;
exports.documentCategory = documentCategory;
exports.documentCategoryLabel = documentCategoryLabel;
exports.documentCategories = [
    { id: 'Proposal_Report', label: 'Proposal Reports' },
    { id: 'Presentations', label: 'Presentations' },
    { id: 'Research_paper', label: 'Research Papers' },
    { id: 'Individual_Thesis', label: 'Individual Theses' },
    { id: 'Other', label: 'Other Documents' },
];
function documentCategory(pathParts) {
    return exports.documentCategories.find(category => pathParts.some(part => part.toLowerCase() === category.id.toLowerCase()))?.id ?? 'Other';
}
function documentCategoryLabel(id) {
    return exports.documentCategories.find(category => category.id === id)?.label ?? 'Other Documents';
}
