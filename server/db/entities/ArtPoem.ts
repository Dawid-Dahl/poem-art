import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToMany,
	JoinTable,
	OneToMany,
} from "typeorm";
import {Collection} from "./Collection";
import {Comment} from "./Comment";

@Entity()
export class ArtPoem extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: "varchar"})
	title: string;

	@Column({type: "text"})
	content: string;

	@Column({type: "integer", default: 0})
	likes: number;

	@Column({type: "varchar", nullable: true})
	imageUrl: string;

	@ManyToMany(type => Collection)
	@JoinTable()
	collections: Collection;

	@OneToMany(type => Comment, comment => comment.artPoem)
	comments: Comment;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
