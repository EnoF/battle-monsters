import React from "react";

interface StatsProps {
  name: string;
  hp: number;
  maxHp: number;
}

enum HP_COLORS {
  HEALTHY_GREEN = "#22cc33",
  DANGEROUSLY_LOW = "#ffa500",
}
function getHpColor(hpPercentage: number) {
  if (hpPercentage > 30) return HP_COLORS.HEALTHY_GREEN;
  return HP_COLORS.DANGEROUSLY_LOW;
}
export function Stats({ name, hp, maxHp }: StatsProps) {
  const hpPercentage = Math.floor((hp / maxHp) * 100);
  const hpColor = getHpColor(hpPercentage);
  return (
    <section>
      <h2>{name}</h2>
      <div className="hp">
        <span className="hp__content">
          {hp}/{maxHp}
        </span>
      </div>
      <style jsx>{`
        .hp {
          text-align: right;
          padding: 0.2em 0.5em;
          border-radius: 0.5em;
          position: relative;
        }
        .hp__content {
          z-index: 3;
        }
        .hp::after {
          border-radius: 0.5em;
          background-color: #cc2233;
          content: "";
          height: 100%;
          width: 100%;
          left: 0;
          top: 0;
          position: absolute;
          z-index: 1;
        }

        .hp::before {
          ${hp === maxHp ? "border-radius: 0.5em;" : ""}
          background-color: ${hpColor};
          content: "";
          height: 100%;
          width: ${hpPercentage}%;
          left: 0;
          top: 0;
          position: absolute;
          z-index: 2;
        }
      `}</style>
    </section>
  );
}
