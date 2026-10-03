"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  BatteryCharging,
  Gauge,
  Route,
  Zap,
} from "lucide-react";

const categories = [
  {
    id: "SCOOTERS",
    label: "Electric Scooters",
  },
  {
    id: "CARS",
    label: "Electric Cars",
  },
  {
    id: "3-WHEELERS",
    label: "Electric 3-Wheelers",
  },
];

const products = [
  // --------------------------------------------------
  // SCOOTERS
  // --------------------------------------------------
  {
    id: "01",
    name: "URBAN X1",
    category: "SCOOTERS",
    image:
      "https://img.magnific.com/premium-psd/orange-electric-scooter_281691-6221.jpg",
    description:
      "A compact electric scooter engineered for efficient everyday urban mobility.",
    range: "120 km",
    power: "4.0 kW",
    speed: "85 km/h",
    battery: "3.2 kWh",
    charging: "4.5 hrs",
    acceleration: "0–40 km/h",
    motor: "Hub Motor",
    drive: "Rear Wheel",
  },
  {
    id: "02",
    name: "CITY S",
    category: "SCOOTERS",
    image:
      "https://img.magnific.com/premium-photo/modern-electric-scooter-zooming-city-ai-generated_921479-49115.jpg?w=1060",
    description:
      "A refined city scooter combining connected technology, smooth acceleration and practical range.",
    range: "100 km",
    power: "3.0 kW",
    speed: "75 km/h",
    battery: "2.8 kWh",
    charging: "4 hrs",
    acceleration: "0–40 km/h",
    motor: "Hub Motor",
    drive: "Rear Wheel",
  },
  {
    id: "03",
    name: "STREET R",
    category: "SCOOTERS",
    image:
      "https://img.magnific.com/premium-vector/realistic-bicycle-vector-illustration-concept_1253202-22160.jpg?w=1060",
    description:
      "A performance-oriented electric scooter designed for longer daily rides and responsive city performance.",
    range: "180 km",
    power: "6.0 kW",
    speed: "95 km/h",
    battery: "5.8 kWh",
    charging: "5.5 hrs",
    acceleration: "0–40 km/h",
    motor: "Mid Drive",
    drive: "Rear Wheel",
  },
  {
    id: "04",
    name: "URBAN PRO",
    category: "SCOOTERS",
    image:
      "https://img.magnific.com/premium-photo/future-electric-scooter-scooty_221414-994.jpg?w=1060",
    description:
      "Premium electric scooter performance with a high-capacity battery and intelligent ride systems.",
    range: "200 km",
    power: "7.0 kW",
    speed: "105 km/h",
    battery: "7.2 kWh",
    charging: "5 hrs",
    acceleration: "0–40 km/h",
    motor: "Mid Drive",
    drive: "Rear Wheel",
  },

  // --------------------------------------------------
  // CARS
  // --------------------------------------------------
  {
    id: "05",
    name: "VOLT C1",
    category: "CARS",
    image:
      "https://img.magnific.com/premium-photo/eco-friendly-car-concept-with-electric-vehicle-charging-station3d-ev-car-isolated-white_641503-356168.jpg?w=1060",
    description:
      "A refined electric city car combining efficient performance, intelligent technology and everyday comfort.",
    range: "350 km",
    power: "100 kW",
    speed: "150 km/h",
    battery: "45 kWh",
    charging: "6.5 hrs",
    acceleration: "0–100 km/h",
    motor: "Permanent Magnet",
    drive: "Front Wheel",
  },
  {
    id: "06",
    name: "VOLT X",
    category: "CARS",
    image:
      "https://img.magnific.com/premium-photo/futuristic-electric-car-charging-station-green-energy_1164395-1134.jpg?w=1060",
    description:
      "A dynamic electric crossover designed for longer journeys with responsive performance and intelligent energy management.",
    range: "450 km",
    power: "150 kW",
    speed: "180 km/h",
    battery: "60 kWh",
    charging: "7 hrs",
    acceleration: "0–100 km/h",
    motor: "Permanent Magnet",
    drive: "Rear Wheel",
  },

  // --------------------------------------------------
  // 3-WHEELERS
  // --------------------------------------------------
  {
    id: "09",
    name: "PASSENGER E3",
    category: "3-WHEELERS",
    image:
      "https://img.magnific.com/premium-photo/small-electric-vehicle-transparent-background-ai_894067-12297.jpg?w=1060",
    description:
      "A practical electric passenger vehicle designed for comfortable and efficient urban transportation.",
    range: "150 km",
    power: "8.0 kW",
    speed: "55 km/h",
    battery: "10 kWh",
    charging: "5 hrs",
    capacity: "4 + 1",
    payload: "450 kg",
    motor: "BLDC Motor",
    drive: "Rear Wheel",
  }
];

const specs = [
  {
    key: "range",
    label: "Range",
    icon: Route,
  },
  {
    key: "power",
    label: "Motor Power",
    icon: Zap,
  },
  {
    key: "speed",
    label: "Top Speed",
    icon: Gauge,
  },
  {
    key: "battery",
    label: "Battery",
    icon: BatteryCharging,
  },
];

export default function Products() {
  const sectionRef = useRef(null);

  const [category, setCategory] = useState("SCOOTERS");
  const [selectedId, setSelectedId] = useState("01");

  const shouldReduceMotion = useReducedMotion();

  // --------------------------------------------------
  // SCROLL ANIMATION
  // --------------------------------------------------

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-80, 100]
  );

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [25, -25]
  );

  const numberY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [60, -60]
  );

  // --------------------------------------------------
  // PRODUCT FILTER
  // --------------------------------------------------

  const categoryProducts = products.filter(
    (product) => product.category === category
  );

  const selectedProduct =
    categoryProducts.find(
      (product) => product.id === selectedId
    ) || categoryProducts[0];

  // --------------------------------------------------
  // CATEGORY CHANGE
  // --------------------------------------------------

  const changeCategory = (newCategory) => {
    if (newCategory === category) return;

    setCategory(newCategory);

    const firstProduct = products.find(
      (product) => product.category === newCategory
    );

    if (firstProduct) {
      setSelectedId(firstProduct.id);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative overflow-hidden bg-white text-black"
    >
      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid */}
        <motion.div
          style={{ y: glowY }}
          className="absolute inset-[-120px] opacity-70"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(0,0,0,.035) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(0,0,0,.035) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "70px 70px",
            }}
          />
        </motion.div>

        {/* Main green glow */}
        <motion.div
          style={{ y: glowY }}
          animate={
            shouldReduceMotion
              ? {
                  scale: 1,
                  opacity: 0.12,
                }
              : {
                  scale: [1, 1.05, 1],
                  opacity: [0.1, 0.17, 0.1],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute left-[58%] top-[28%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#baff35]/25 blur-[150px]"
        />

        {/* Secondary glow */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {
                  x: 0,
                  y: 0,
                }
              : {
                  x: [-20, 20, -20],
                  y: [15, -15, 15],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute left-[8%] top-[55%] h-[220px] w-[220px] rounded-full bg-[#baff35]/10 blur-[100px]"
        />
      </div>

      {/* ==================================================
          CONTAINER
      ================================================== */}

      <div className="relative mx-auto max-w-[1600px] px-5 py-16 sm:px-8 md:px-12 md:py-20 lg:px-16">
        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-8 flex items-end justify-between gap-8"
        >
          <div>
            <motion.p
              initial={{
                opacity: 0,
                x: -15,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.1,
                duration: 0.5,
              }}
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40"
            >
              Electric Mobility
            </motion.p>

            <h2 className="overflow-hidden text-[12vw] font-black leading-[0.72] tracking-[-0.1em] sm:text-[10vw] md:text-[7rem] lg:text-[8rem]">
              <motion.span
                initial={{
                  y: "100%",
                }}
                whileInView={{
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                OUR{" "} &nbsp;
              </motion.span>

              <motion.span
                initial={{
                  y: "100%",
                }}
                whileInView={{
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.08,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block text-black/10"
              >
                FLEET.
              </motion.span>
            </h2>
          </div>

          <p className="hidden max-w-[280px] pb-2 text-sm leading-6 text-black/50 md:block">
            Electric vehicles engineered for modern mobility.
          </p>
        </motion.div>

        {/* ==================================================
            CATEGORY NAV
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.15,
            duration: 0.6,
          }}
          className="mb-5 border-y border-black/10"
        >
          <div className="flex overflow-x-auto scrollbar-none">
            {categories.map((item, index) => {
              const active = category === item.id;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => changeCategory(item.id)}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: 0.2 + index * 0.07,
                    duration: 0.4,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -2,
                        }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 0.97,
                        }
                  }
                  className="relative shrink-0 px-4 py-3.5 text-left sm:px-6 lg:px-7"
                >
                  <span
                    className={`whitespace-nowrap text-xs font-bold uppercase tracking-wide transition-colors sm:text-sm ${
                      active
                        ? "text-black"
                        : "text-black/35 hover:text-black"
                    }`}
                  >
                    {item.label}
                  </span>

                  {active && (
                    <motion.span
                      layoutId="category-line"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                      className="absolute bottom-0 left-4 right-4 h-[3px] bg-[#baff35] sm:left-6 sm:right-6 lg:left-7 lg:right-7"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div className="grid lg:grid-cols-[180px_minmax(0,1fr)]">
          {/* ==================================================
              DESKTOP MODEL NAV
          ================================================== */}

          <aside className="hidden lg:block">
            <div className="sticky top-24 pr-8">
              <motion.p
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/35"
              >
                Models
              </motion.p>

              <div>
                {categoryProducts.map((product, index) => {
                  const active =
                    selectedProduct.id === product.id;

                  return (
                    <motion.button
                      key={product.id}
                      type="button"
                      onClick={() =>
                        setSelectedId(product.id)
                      }
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              x: 5,
                            }
                      }
                      className={`relative flex w-full items-center gap-3 border-b border-black/10 py-3.5 text-left transition-colors ${
                        active
                          ? "text-black"
                          : "text-black/35 hover:text-black"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="model-line"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          }}
                          className="absolute left-[-12px] h-7 w-[3px] bg-[#baff35]"
                        />
                      )}

                      <span className="font-mono text-[10px]">
                        {product.id}
                      </span>

                      <span className="truncate text-xs font-black">
                        {product.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ==================================================
              PRODUCT AREA
          ================================================== */}

          <div className="min-w-0">
            {/* ==================================================
                MOBILE MODEL NAV
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden"
            >
              {categoryProducts.map((product) => {
                const active =
                  selectedProduct.id === product.id;

                return (
                  <motion.button
                    key={product.id}
                    type="button"
                    onClick={() =>
                      setSelectedId(product.id)
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 0.95,
                          }
                    }
                    className={`shrink-0 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wide ${
                      active
                        ? "bg-black text-white"
                        : "border border-black/10 bg-white text-black/45"
                    }`}
                  >
                    {product.name}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* ==================================================
                PRODUCT VISUAL
            ================================================== */}

            <div className="relative h-[300px] overflow-hidden sm:h-[380px] md:h-[450px] lg:h-[470px]">
              {/* Product number */}
              <motion.div
                style={{
                  y: numberY,
                }}
                className="absolute right-0 top-0 select-none text-[100px] font-black leading-none tracking-[-0.1em] text-black/[0.035] sm:text-[150px] md:text-[190px]"
              >
                {selectedProduct.id}
              </motion.div>

              {/* Product glow */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {
                        scale: 1,
                        opacity: 0.14,
                      }
                    : {
                        scale: [1, 1.06, 1],
                        opacity: [0.12, 0.2, 0.12],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? {
                        duration: 0,
                      }
                    : {
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="absolute left-1/2 top-1/2 h-[220px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#baff35]/25 blur-[90px]"
              />

              {/* Technical ring */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {
                        rotate: 0,
                      }
                    : {
                        rotate: 360,
                      }
                }
                transition={
                  shouldReduceMotion
                    ? {
                        duration: 0,
                      }
                    : {
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
                className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-black/[0.07]"
              />

              {/* Second technical ring */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {
                        rotate: 0,
                      }
                    : {
                        rotate: -360,
                      }
                }
                transition={
                  shouldReduceMotion
                    ? {
                        duration: 0,
                      }
                    : {
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
                className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.05]"
              />

              {/* Ground shadow */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {
                        scaleX: 1,
                        opacity: 0.12,
                      }
                    : {
                        scaleX: [1, 0.92, 1],
                        opacity: [0.16, 0.08, 0.16],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? {
                        duration: 0,
                      }
                    : {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="absolute bottom-[8%] left-1/2 h-7 w-[55%] -translate-x-1/2 rounded-full bg-black/20 blur-xl"
              />

              {/* ==================================================
                  PRODUCT TRANSITION
              ================================================== */}

              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={selectedProduct.id}
                  initial={{
                    opacity: 0,
                    x: 100,
                    scale: 0.88,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: -100,
                    scale: 0.94,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* SCROLL PARALLAX */}
                  <motion.div
                    style={{
                      y: imageY,
                    }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    {/* FLOATING IMAGE */}
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {
                              y: 0,
                            }
                          : {
                              y: [0, -6, 0],
                            }
                      }
                      transition={
                        shouldReduceMotion
                          ? {
                              duration: 0,
                            }
                          : {
                              duration: 4.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                      }
                      className="flex h-full w-full items-center justify-center"
                    >
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        draggable="false"
                        className="h-full w-full select-none object-contain px-4 py-6 sm:px-8"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* ==================================================
                  FLOATING LABELS
              ================================================== */}

              <motion.div
                animate={
                  shouldReduceMotion
                    ? {
                        y: 0,
                      }
                    : {
                        y: [0, -5, 0],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? {
                        duration: 0,
                      }
                    : {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="absolute left-3 top-8 hidden rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] backdrop-blur-md sm:block"
              >
                Electric
              </motion.div>

              <motion.div
                animate={
                  shouldReduceMotion
                    ? {
                        y: 0,
                      }
                    : {
                        y: [0, 5, 0],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? {
                        duration: 0,
                      }
                    : {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="absolute bottom-8 right-3 hidden rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] backdrop-blur-md sm:block"
              >
                Zero Emission
              </motion.div>
            </div>

            {/* ==================================================
                PRODUCT INFORMATION
            ================================================== */}

            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={selectedProduct.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-t-2 border-black pt-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  {/* Product title */}
                  <div className="min-w-0">
                    <motion.p
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.08,
                        duration: 0.35,
                      }}
                      className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#617700]"
                    >
                      {
                        categories.find(
                          (item) =>
                            item.id ===
                            selectedProduct.category
                        )?.label
                      }
                    </motion.p>

                    <motion.h3
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.12,
                        duration: 0.4,
                      }}
                      className="truncate text-5xl font-black leading-none tracking-[-0.08em] sm:text-6xl md:text-7xl lg:text-[5rem]"
                    >
                      {selectedProduct.name}
                    </motion.h3>

                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.18,
                        duration: 0.4,
                      }}
                      className="mt-3 max-w-xl text-sm leading-5 text-black/55 sm:text-base"
                    >
                      {selectedProduct.description}
                    </motion.p>
                  </div>

                  {/* CTA */}
                  <motion.button
                    type="button"
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.04,
                          }
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 0.96,
                          }
                    }
                    className="group flex shrink-0 items-center justify-center gap-3 rounded-full bg-black px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#baff35] hover:text-black"
                  >
                    <span>Explore Model</span>

                    <motion.span
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              rotate: 45,
                            }
                      }
                      className="grid h-7 w-7 place-items-center rounded-full bg-white text-black transition-colors group-hover:bg-black group-hover:text-white"
                    >
                      <ArrowUpRight size={14} />
                    </motion.span>
                  </motion.button>
                </div>

                {/* ==================================================
                    SPECS
                ================================================== */}

                <div className="mt-6 grid grid-cols-2 border-y border-black sm:grid-cols-4">
                  {specs.map((spec, index) => {
                    const Icon = spec.icon;

                    return (
                      <motion.div
                        key={spec.key}
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.15 + index * 0.07,
                          duration: 0.4,
                        }}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                backgroundColor:
                                  "rgba(186,255,53,0.08)",
                              }
                        }
                        className={`group py-3.5 transition-colors ${
                          index > 0
                            ? "border-l border-black/10 pl-4 sm:pl-5"
                            : ""
                        } ${
                          index > 1
                            ? "border-t border-black/10 sm:border-t-0"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Icon
                            size={14}
                            className="text-black/45 transition-colors group-hover:text-[#617700]"
                          />

                          <span className="text-[9px] font-bold uppercase tracking-wide text-black/40">
                            {spec.label}
                          </span>
                        </div>

                        <p className="mt-1 text-base font-black sm:text-lg">
                          {selectedProduct[spec.key]}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ==================================================
          SECTION ACCENT
      ================================================== */}

      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-[#baff35]"
      />
    </section>
  );
}