import { Column, CreateDateColumn, Entity, PrimaryColumn,  } from "typeorm";

@Entity("rating_history")
export class RatingModel {
  @PrimaryColumn()
	public id: string;

	@Column({ type: "varchar" })
  public userId: string;

  // ID игры, в которой изменился рейтинг
  @Column({ type: "varchar" })
  public gameId: string;

  @Column()
  public value: number;

  @CreateDateColumn()
  public createdAt: Date;

}
