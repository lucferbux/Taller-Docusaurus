import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Guía apoyo',
    image: '/img/teamwork-presentation.svg',
    description: (
      <>
        Esta guía está pensada para seguir las clases del Taller del Máster Full Stack en Web Development de ThreePoints.
      </>
    ),
  },
  {
    title: 'Contenido estructurado',
    image: '/img/computer-work.svg',
    description: (
      <>
        La documentación está dividida en secciones que corresponden a las diferentes clases del Taller.
      </>
    ),
  },
  {
    title: 'Proyectos del Taller',
    image: '/img/teamwork-building.svg',
    description: (
      <>
        Cada guía indica a qué proyecto corresponde, para poder seguir el código de cada apartado.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
