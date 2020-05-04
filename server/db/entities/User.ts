import {
	Entity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	OneToMany,
} from "typeorm";
import {Collection} from "./Collection";
import {Comment} from "./Comment";

@Entity()
export class User extends BaseEntity {
	@PrimaryColumn({type: "varchar", unique: true})
	id: string;

	@Column({type: "varchar"})
	username: string;

	@Column({type: "boolean", default: 0})
	admin: boolean;

	@Column({type: "varchar", nullable: true})
	profilePicture: string;

	@OneToMany(type => Collection, collection => collection.user)
	collections: Collection;

	@OneToMany(type => Comment, comment => comment.user)
	comment: Collection;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
