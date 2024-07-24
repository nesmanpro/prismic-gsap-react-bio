'use client'

import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes";


// GSAP
gsap.registerPlugin(useGSAP);



/**
 * Props for `Hero`. */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices. */
const Hero = ({ slice }: HeroProps): JSX.Element => {

  const component = useRef();


  useGSAP(
    () => {
      const tl = gsap.timeline()

      const title = () => {
        gsap.fromTo('.name-animation', {
          x: -100,
          opacity: 0,
          rotate: -10
        },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            ease: "elastic.out(1,0.3)",
            transformOrigin: 'left top',
            stagger: {
              each: 0.1,
              from: 'random'
            }
          })
      }

      const subtitle = () => {
        gsap.fromTo('.job-title', {
          y: 20,
          opacity: 0,
          scale: 1.2
        }, {
          y: 0,
          opacity: 1,
          duration: 1,
          scale: 1,
          ease: "elastic.out(1,0.3)",
        })
      }

      tl
        .add(title, 0)
        .add(subtitle, 1)

    },
    { scope: component }
  );



  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((l, i) => (
      <span key={i} className={`name-animation name-animation-${key} inline-block opacity-0`}>
        {l}
      </span>
    ))
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes />
        <div className="col-start-1 md:row-start-1 select-none text-center md:text-left">
          <h1 className="mb-8 text-[clamp(3rem,18vmin,19rem)] font-extrabold leading-none tracking-tighter" aria-label={slice.primary.first_name + ' ' + slice.primary.last_name}>
            <span className="block text-slate-100">{renderLetters(slice.primary.first_name, 'first')}</span>
            <span className="block text-slate-400 -mt-[.2em]">{renderLetters(slice.primary.last_name, 'last')}</span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-yellow-500 via-amber-200 to-yellow-500 bg-clip-text text-1xl font-bold uppercase tracking-[.2em] text-transparent md:text-[1.9rem] opacity-0">{slice.primary.tag_line}</span>
        </div>
        <div></div>
      </div>
    </Bounded>
  );
};

export default Hero;
