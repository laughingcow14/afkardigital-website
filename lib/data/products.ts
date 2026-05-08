export interface ProductDetail {
  name: string;
  tagline: string;
  overview: string[];
  sections: { h: string; items: string[] }[];
}

export interface Product {
  id: string;
  cat: string;
  tint: string;
  name: string;
  desc: string;
  tag: string;
}

export const PRODUCTS: Product[] = [
  { id: "power", cat: "Power", tint: "yellow", name: "Central Power Monitoring System", desc: "Fully wireless Plug-and-Sense monitoring of voltage, current, power, energy and power factor across your entire facility.", tag: "Power" },
  { id: "thermal-central", cat: "Thermal", tint: "peach", name: "Central Thermal Monitoring System", desc: "Wireless ±0.2°C Swiss-made temperature & humidity sensors, instantly relocatable, with 2D/3D thermal maps.", tag: "Thermal" },
  { id: "data-center", cat: "Thermal", tint: "sky", name: "Data Center Thermal Monitoring", desc: "Wireless or wired CAT6 cascaded sensors built for the data center floor — supporting Hot Aisle Containment and traditional layouts.", tag: "Thermal" },
  { id: "wireless-thermal", cat: "Thermal", tint: "rose", name: "Wireless Thermal Monitoring & Commissioning Tool", desc: "Purpose-built audit kit. Real measurements from real locations. Setup ready in hours, not days.", tag: "Thermal" },
  { id: "hudhud", cat: "Platform", tint: "lavender", name: "Smart Hudhud — IoT Logger / Controller", desc: "Universal IoT logger and controller. RS485, Modbus, SNMP, IFTTT rules, English/Arabic UI. The brain behind everything we ship.", tag: "Platform" },
  { id: "qatarat", cat: "Agri", tint: "mint", name: "QATARAT — Smart Irrigation System", desc: "Volume-based smart irrigation. Includes QATARAT Lite — a compact plug-and-play unit for home gardens.", tag: "Agri-tech" },
  { id: "labeeb", cat: "Facility", tint: "cream", name: "LABEEB — Smart Home & Facility Automation", desc: "A/C, lighting, presence detection, smart switches and analytics — engineered for measurable energy savings.", tag: "Facility" },
];

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  power: {
    name: "Central Power Monitoring System",
    tagline: "Fully wireless, Plug-and-Sense power monitoring across your entire facility.",
    overview: [
      "The Central Power Monitoring System is a fully wireless Plug-and-Sense solution that eliminates the need for complex cable installations. Designed and developed entirely by Afkar Digital — including the power meter SDKs, microcontroller gateways, and application software — this system delivers accurate, real-time monitoring of electrical consumption across your entire facility.",
      "It is ideally suited for Data Centers and is equally effective in Warehouses, Supermarkets, Factories, Cold Rooms, and any facility where understanding energy usage is critical. With seamless integration into existing BMS, SCADA, and DCIM platforms, the system fits naturally into your current infrastructure.",
    ],
    sections: [
      { h: "Key Features", items: ["Fully wireless — no additional cabling required","Zero power interruption during installation in Data Centers","Measures all critical electrical attributes: Voltage, Current, Power, Energy (kWh), Frequency, and Power Factor","Push-based alarms triggered instantly upon threshold breach","Dual Wi-Fi operation with automatic failover","High-accuracy Class 0.5 power sensors","Quick installation — typically completed within a few hours","Centralized monitoring across multiple remote sites from a single dashboard","Full BMS/SCADA/DCIM integration","Ultra-low module power consumption: less than 1W"] },
      { h: "Advanced Analytics & Reporting", items: ["Interactive graphs and historical reports","Tabular and layout-based data views","Daily and monthly energy consumption analytics","Local and cloud-based data storage","Offline resilience: power meters continue accumulating kWh even without Wi-Fi"] },
      { h: "Configurable Alerts", items: ["SMS","Email","WhatsApp","Automated phone calls with digital voice for critical and emergency situations"] },
      { h: "Business Value", items: ["Monitor your facility 24/7 with complete visibility","Accurately measure power consumption per cabinet, equipment unit, or client","Issue invoices to clients based on actual power usage","Monitor electrical attribute stability and detect anomalies early"] },
    ],
  },
  "thermal-central": {
    name: "Central Thermal Monitoring System",
    tagline: "Wireless Plug-and-Sense temperature & humidity monitoring, instantly relocatable.",
    overview: [
      "The Central Thermal Monitoring System uses wireless Plug-and-Sense temperature and humidity sensors to deliver continuous, accurate environmental monitoring without the limitations of traditional wired systems. Sensors can be installed instantly at any desired location — on shelves, inside refrigerators, freezers, near AC supply or return — and relocated just as easily.",
      "This flexibility provides a significant advantage over legacy wired systems, enabling better thermal optimization in environments where temperature management directly impacts product quality, compliance, or operational efficiency.",
    ],
    sections: [
      { h: "Key Features", items: ["Fully wireless — no cables required","Swiss-made sensors with ±0.2°C temperature accuracy, verified by the Royal Scientific Society of Jordan","Compact form factor — easily placed at any desired monitoring point","Sensors can be relocated freely at any time","Approximately 2-year replaceable battery life","Local or cloud-based data storage","Automated alerts via Email, SMS, WhatsApp, and phone calls with digital voice"] },
      { h: "Hidden Issues We Uncover", items: ["Incorrectly positioned temperature set points","Elevated electricity bills caused by over-cooling or over-heating","Hot spots resulting from HVAC malfunctions","Cooled air not reaching intended areas","Poorly designed HVAC systems","Uneven cooling distribution across zones"] },
      { h: "Where It Is Commonly Used", items: ["Data Centers and Telecom Core Buildings","Medicine and Food Storage Warehouses","Greenhouses and Farms","Pharmacies and Laboratories","Malls, Supermarkets, and Retail Spaces","Hospitals and Healthcare Facilities"] },
    ],
  },
  "data-center": {
    name: "Data Center Thermal Monitoring",
    tagline: "Wireless or wired thermal monitoring built for the data center floor.",
    overview: [
      "Afkar Digital's Data Center Thermal Monitoring solution supports both wireless and wired sensor configurations, giving you the flexibility to choose the approach that best suits your data center's size, layout, and ongoing expansion plans.",
    ],
    sections: [
      { h: "Wireless Sensing (Plug-and-Sense)", items: ["Compact, battery-operated sensors built on the latest long-range IoT technology, reaching up to 100 meters","Place at cabinet fronts, cabinet backs, AC supply, AC return, or any critical location — without cabling constraints","Battery life ~2 years; battery status continuously monitored","Ideal for thermal audits, commissioning, and ongoing data center optimization"] },
      { h: "System Features", items: ["Swiss-made sensors with ±0.2°C accuracy, verified by the Royal Scientific Society of Jordan","Real-time monitoring of temperature and humidity at any point in the data center","3D Thermal Map visualization","Playback mode to investigate past thermal events","Full integration with BMS, SCADA, and DCIM systems"] },
      { h: "Service Option: Thermal Audit", items: ["Professional Thermal Audit Service in addition to the permanent monitoring system","Audit setup ready within hours","Delivers a full thermal performance assessment with clear recommendations for HVAC optimization and hot-spot elimination"] },
    ],
  },
  "wireless-thermal": {
    name: "Wireless Thermal Monitoring & Commissioning Tool",
    tagline: "Purpose-built for thermal audits — real measurements from real locations, no cabling.",
    overview: [
      "The Wireless Thermal Monitoring and Commissioning Tool is purpose-built for conducting accurate thermal assessments of critical environments, including Data Centers, Medicine Warehouses, and Cold Storage Rooms. Using wireless Plug-and-Sense sensors, the tool captures real measurements from actual locations — not simulations.",
    ],
    sections: [
      { h: "Tool Features", items: ["Fully wireless — no cabling required","Swiss-made sensors with ±0.2°C accuracy","Small form factor — easy to deploy at any critical monitoring point","2 to 3-year replaceable battery","Quick installation — ready for use within hours","Automated alerts via Email, SMS, WhatsApp, and phone calls with digital voice"] },
      { h: "Common Findings from Real-World Deployments", items: ["Non-uniform cooling across server cabinets","Parallel AC operation issues","Unbalanced cooling distribution and hot spots","Cooled air not reaching intended areas","Airflow blockage beneath raised floors","Suboptimal HVAC design or set-point configuration"] },
      { h: "Energy Saving", items: ["Safely raise the data center temperature set point to reduce cooling costs","Identify and reduce unnecessary airflow"] },
    ],
  },
  hudhud: {
    name: "Smart Hudhud — IoT Logger / Controller",
    tagline: "A universal IoT logger and controller for industrial and general-purpose use.",
    overview: [
      "The Smart Hudhud is a universal IoT Logger and Controller designed for both industrial and general-purpose applications. It connects to virtually any sensor, meter, or field device, enabling real-time local and remote monitoring and control from any mobile or desktop browser.",
      "The system supports English and Arabic, making it well suited for the Jordanian and wider regional market.",
    ],
    sections: [
      { h: "Universal Logger & Controller Features", items: ["Configurable polling intervals and recording periods","Local and remote monitoring and control","Flexible scheduling: hourly, daily, weekly, monthly, and yearly","Rule-based automation using IF-This-Then-That (IFTTT) logic","Data export to Excel and interactive graph views","Bilingual interface: English and Arabic","Configurable dashboards with a rich icon library"] },
      { h: "Compatible Sensors & Devices", items: ["Temperature, Humidity, Pressure, Level, Flow Meters, and Energy Meters","Analogue and Digital I/O field units","Any On/Off controlled device","Standard protocols: RS485, Modbus TCP, Serial, SNMP, UDP/TCP"] },
      { h: "Simple Deployment", items: ["No static IP address required at the installation site","No DDNS or port forwarding configuration needed","No special router settings required — plug in and operate"] },
      { h: "Alerts & Notifications", items: ["In-controller notifications","Email, SMS, and WhatsApp alerts","Automated phone calls with digital voice for critical and emergency situations"] },
    ],
  },
  qatarat: {
    name: "QATARAT — Smart Irrigation System",
    tagline: "Volume-based smart irrigation — every basin gets exactly the right amount of water.",
    overview: [
      "QATARAT is Afkar Digital's Smart Irrigation System, designed to address one of the most common weaknesses of conventional irrigation: the inability to know exactly how much water each basin is receiving.",
      "QATARAT solves this with volume-based irrigation schedules, ensuring every basin receives precisely the right amount of water, every time. Smart Irrigation is no longer a luxury — as water costs rise in Jordan and across the region, it is becoming an essential tool.",
    ],
    sections: [
      { h: "Key Features", items: ["Volume-based and time-period irrigation schedules per basin","Fully automated scheduling: morning, evening, night, daily, weekly, and custom","Safe 24V electrical valves with auto-close on power failure","Alerts for low water flow, high water flow, and leakage","Remote monitoring and control from any mobile or desktop browser","Detailed water consumption reports per basin","Bilingual: English and Arabic"] },
      { h: "Where QATARAT Is Used", items: ["Home Gardens","Farms and Agricultural Land","Public Parks","Greenhouses and Glass Houses"] },
      { h: "QATARAT Lite — Compact Version for Home Gardens", items: ["All-in-one plug-and-play irrigation device for home gardens and small farms","Built-in irrigation controller","Four electrical ball valves","Electronic water flow meter","Operates on 12V for safe home use","Includes the same core scheduling, volume-based irrigation, alerts, and remote monitoring features"] },
    ],
  },
  labeeb: {
    name: "LABEEB — Smart Home & Facility Automation",
    tagline: "A comprehensive smart-automation platform built for measurable energy savings.",
    overview: [
      "LABEEB is Afkar Digital's comprehensive Smart Automation Platform — extending well beyond the conventional concept of smart home lighting or curtain control. Designed for homes, hotels, office buildings, hospitals, schools, factories, malls, and more, LABEEB targets meaningful, measurable energy savings through intelligent integration of all facility systems.",
    ],
    sections: [
      { h: "Energy-Saving Automation Examples", items: ["Smart Cooling & Heating (A/C & AHU Control): Integrates motion detectors and wireless temperature sensors to automatically switch off or raise the set point of A/C units in unoccupied rooms.","Smart Lighting: Combines motion detectors, daylight sensors, employee Bluetooth presence detection, and RFID card readers to ensure lights are switched off automatically.","Smart Thermostat & IR Module: Replaces legacy thermostats with remotely controllable smart units that prevent over-cooling and over-heating.","Smart BT Presence Detection: Detects employee presence using their mobile Bluetooth signal."] },
      { h: "System Features", items: ["Flexible scheduling: hourly, daily, weekly, monthly, and absolute schedules","Conditional automation using IF-This-Then-That (IFTTT) rules","Scene control: trigger multiple actions with a single command","Full alert support: Email, SMS, WhatsApp, and automated phone calls","Integration with BMS, SCADA, and DCIM systems","Bilingual: English and Arabic"] },
      { h: "Smart Switches", items: ["Touch-sensitive glass panels — no physical clicks required","Customizable logos and labels on the panel","LED status indicators and backlit display for low-light environments","Available in 1 to 8-gang configurations, wired or wireless"] },
    ],
  },
};
