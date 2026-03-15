import { Module } from './module.entity';
export declare class Roadmap {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    modules: Module[];
}
