/* eslint-disable react/prop-types */
import styles from "./exercise-item.module.css";
import Button from "../../button/button";

const ExerciseItem = ({
  category,
  movement,
  imageUrl,
  series,
  repetitions,
  weight,
  duration,
  restTime,
  notes,
  id,
  modifyExercise,
  deleteExercise,
}) => {
  return (
    <div className={styles["exercise-item"]}>
      <div className={styles["exercise-picture"]}>
        <img alt={movement.title} src={imageUrl} />
      </div>
      <div className={styles["exercise-item-movement"]}>
        <div className={styles["exercise-infos"]}>
          <div className={styles["exercise-infos-left"]}>
            <div>
              <p>
                <span className={styles.bold}>Catégorie :</span> {category}
              </p>
            </div>
            <div>
              <p>
                <span className={styles.bold}>Exercice :</span> {movement}
              </p>
            </div>
            <div>
              <p>
                <span className={styles.bold}>Séries :</span> {series}
              </p>
            </div>
            <div>
              <p>
                <span className={styles.bold}>Répétitions :</span> {repetitions}
              </p>
            </div>
          </div>
          <div className={styles["exercise-infos-right"]}>
            <div>
              <p>
                <span className={styles.bold}>Poids :</span> {weight}
              </p>
            </div>
            <div>
              <p>
                <span className={styles.bold}>Durée :</span> {duration}
              </p>
            </div>
            <div>
              <p>
                <span className={styles.bold}>Temps de récupération :</span>{" "}
                {restTime}
              </p>
            </div>
            <div className={styles["exercise-notes"]}>
              <p>
                <span className={styles.bold}>Notes :</span>
              </p>
              <div>{notes}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button type="button" text="Modifier" action={modifyExercise} />
        <Button type="button" text="Supprimer" action={deleteExercise} />
      </div>
    </div>
  );
};

export default ExerciseItem;
