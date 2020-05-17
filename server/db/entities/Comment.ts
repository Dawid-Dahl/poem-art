import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
} from "typeorm";
import {ArtPoem} from "./ArtPoem";
import {User} from "./User";

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: "text"})
	comment: string;

	@Column({type: "integer", default: 0})
	likes: number;

	@ManyToOne(type => ArtPoem, ArtPoem => ArtPoem.comments)
	ArtPoem: ArtPoem;

	@ManyToOne(type => User, user => user.collections)
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
