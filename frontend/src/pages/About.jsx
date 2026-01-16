import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"}></Title>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.imagecopy}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700">
          <p>
            At Zist Zari, our journey began in 1987 with a deep-rooted love for artistry and craftsmanship. Founded by the visionary artisan Dan Ali, what started as a humble workshop has evolved into a renowned establishment celebrated for its commitment to quality and personalized service.

          </p>
          <p>
            Today, Dan's legacy is carried forward by his son, Areeb Ali, who skillfully blends tradition with modernity. Under his guidance, Zist Zari remains at the forefront of innovation in the world of hand embroidery, ensuring that each piece we create is both timeless and contemporary.
          </p>
          <b className='text-gray-800'>Our Tradition</b>
          <p>Each stitch and bead we use carries a legacy of centuries-old techniques, woven with care and passion. Our artisans pour their heart into every creation, bringing to life intricate designs that tell stories of culture and heritage. Your satisfaction is our utmost priority, and we stand by our promise to deliver nothing but the finest quality and service.

With a government certification and a portfolio filled with glowing testimonials from satisfied customers, we strive to bring credibility and trustworthiness to every interaction.</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row textsm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Personalized Quality Assurance : </b>
          <p className="text-gray-600">We provide tailored products and services that meet your individual preferences, backed by rigorous quality control processes to ensure every item meets our high standards.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Secure Customer Support : </b>
          <p className="text-gray-600">Our 24/7 customer support team is here to assist with any inquiries or issues, ensuring a safe shopping experience through state-of-the-art security measures that protect your data and secure payment options.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Customer Satisfaction and Timely Updates : </b>
          <p className="text-gray-600">We are committed to your satisfaction, reflected in numerous positive reviews. Expect timely updates on your order status and various payment options for your convenience.</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
