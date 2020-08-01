import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	OneToOne,
	Unique,
	Check,
} from "typeorm";
import {ArtPoem} from "./ArtPoem";
import {User} from "./User";

@Entity()
@Unique(["artpoem", "user"])
export class Like extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => ArtPoem, artpoem => artpoem.like)
	artpoem: ArtPoem;

	@ManyToOne(type => User, user => user.likes)
	user: User;

	@CreateDateColumn()
	createdAt: Date;
}
