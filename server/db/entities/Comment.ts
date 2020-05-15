import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
} from "typeorm";
import {PoemArt} from "./PoemArt";
import {User} from "./User";

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: "text"})
	comment: string;

	@Column({type: "integer", default: 0})
	likes: number;

	@ManyToOne(type => PoemArt, PoemArt => PoemArt.comments)
	PoemArt: PoemArt;

	@ManyToOne(type => User, user => user.collections)
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
