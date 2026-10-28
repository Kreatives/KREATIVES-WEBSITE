import Image from "next/image";
import { overOnsTeam } from "@/lib/site";
import styles from "./OverOnsTeam.module.css";

export default function OverOnsTeam({ data = overOnsTeam }: { data?: typeof overOnsTeam }) {
  return (
    <section className="section" id="over">
      <div className={`container ${styles.grid}`}>
        <div className={styles.media} data-reveal>
          <Image
            src={data.portrait}
            alt=""
            fill
            quality={90}            sizes="(max-width: 860px) 100vw, 45vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.body}>
          <span className="eyebrow" data-reveal>
            {data.eyebrow}
          </span>
          <h2 className={`h2 ${styles.title}`} data-reveal>
            {data.titleLead}{" "}
            <span className="accent accent--orange">
              {data.titleAccent}
            </span>
          </h2>
          <p className={styles.text} data-reveal>
            {data.body}
          </p>
        </div>
      </div>
    </section>
  );
}
