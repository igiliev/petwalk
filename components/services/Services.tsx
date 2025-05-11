'use client';

import {
    faHouseChimney,
    faHouseChimneyUser,
    faPaw,
    faShieldDog,
    faHouseCircleCheck,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { animate, stagger } from "motion";
import { useEffect } from "react";
import MotionWrapper from "../motionWrapper/motionWrapper";

const Services = () => {

  useEffect(() => {
    const boxes = document.querySelectorAll('.service-box');
    animate(boxes, { y: 0, opacity: 1 }, { delay: stagger(0.1) });
  }, []);

  return (
    <section>
    <h1 className="text-center text-4xl mb-12 px-2">Услуги за всяко куче</h1>
    <div className="flex mb-10 justify-evenly flex-col lg:flex-row px-5">
      <div className="left-col">
        <MotionWrapper>
          <div className="flex items-center col-xs-12 col-sm-6 mb-7 lg:max-w-xl service-box">
            <i className="fa-solid fa-house-chimney"></i>
            <FontAwesomeIcon icon={faHouseChimney} style={{ fontSize: 40, color: "#48A9A6", marginRight: 20, border: "2px solid", borderRadius: '30%', padding: 10 }}/>
            <div className="ml-4">
              <h3 className="text-2xl font-semibold mb-2">Гледане във вашия дом</h3>
              <p className="text-slate-500 leading-6">Вашият гледач ще се грижи за домашните ви любимци и за дома ви. Вашите домашни любимци ще получат цялото внимание от което се нуждаят, без да напускат дома си</p>
            </div>
          </div>

          <div className="flex items-center col-xs-12 col-sm-6 mb-7 lg:max-w-xl service-box">
          <FontAwesomeIcon icon={faHouseChimneyUser} style={{ fontSize: 40, color: "#48A9A6", marginRight: 20, border: "2px solid", borderRadius: '30%', padding: 10 }}/>
            <div className="ml-4">
              <h3 className="text-2xl font-semibold mb-2">В дома на гледача</h3>
              <p className="text-slate-500 leading-6">Вашите домашни любимци остават в дома на гледача. Там те ще бъдат третирани като част от семейството в комфортна среда.</p>
            </div>
          </div>

          <div className="flex items-center col-xs-12 col-sm-6 mb-7 lg:max-w-xl service-box">
          <FontAwesomeIcon icon={faPaw} style={{ fontSize: 40, color: "#48A9A6", marginRight: 20, border: "2px solid", borderRadius: '30%', padding: 10 }}/>
            <div className="ml-4">
              <h3 className="text-2xl font-semibold mb-2">Разходка на кучета</h3>
              <p className="text-slate-500 leading-6">Запазете посещение, за да осигурите на домашния си любимец ежедневна доза нужни упражнения.</p>
            </div>
          </div>
        </MotionWrapper>
      </div>

      <div className="right-col">
        <MotionWrapper>
          <div className="flex items-center col-xs-12 col-sm-6 mb-7 lg:max-w-xl service-box">
            <FontAwesomeIcon icon={faShieldDog} style={{ fontSize: 40, color: "#48A9A6", marginRight: 20, border: "2px solid", borderRadius: '30%', padding: 10 }}/>
              <div className="ml-4">
                <h3 className="text-2xl font-semibold mb-2">Дневна грижа за домашни любимци</h3>
                <p className="text-slate-500 leading-6">Домашният ви любимец прекарва деня в дома на гледача. Оставяте го сутрин и взимате щастливо животинче вечерта.</p>
              </div>
          </div>

          <div className="flex items-center col-xs-12 col-sm-6 mb-7 lg:max-w-xl service-box">
            <FontAwesomeIcon icon={faHouseCircleCheck} style={{ fontSize: 40, color: "#48A9A6", marginRight: 20, border: "2px solid", borderRadius: '30%', padding: 10 }}/>
            <div className="ml-4">
              <h3 className="text-2xl font-semibold mb-2">Посещения на място</h3>
              <p className="text-slate-500 leading-6">Вашият гледач идва в дома ви, за да си играе с домашните ви любимци, да ги нахрани или да почисти тоалетната им.</p>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </div>
  </section>
  );
}

export default Services;