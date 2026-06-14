export interface Customer {
  name: string;
  country: string;
  sector: string;
  work: string[];
}

export const CUSTOMERS: Customer[] = [
  { name: "BDO Jordan", country: "Jordan", sector: "Professional Services / Audit & Consulting", work: ["Thermal Monitoring System"] },
  { name: "VTEL", country: "Jordan", sector: "Telecommunications / Fiber Internet & IoT / Smart Data Centers", work: ["Thermal Monitoring System","Power Monitoring System","Smart Facility System","Cloud-Based Calendar System","IoT Modules with Cloud Platform"] },
  { name: "Hewlett Packard Enterprise", country: "KSA", sector: "Information Technology / Enterprise Computing", work: ["Data Center Thermal Commissioning Tool"] },
  { name: "TransJo", country: "Jordan", sector: "Logistics / Transportation", work: ["Thermal Monitoring System"] },
  { name: "German Jordanian University (GJU)", country: "Jordan", sector: "Education / Higher Education", work: ["Data Center Thermal Audit"] },
  { name: "Mohammed Mansour Rumaih For Trading Ltd", country: "KSA", sector: "Trading / Commerce", work: ["Data Center Thermal Commissioning Tool"] },
  { name: "SkyTech", country: "Jordan", sector: "Information Technology / SAP Solutions", work: ["IoT Integration with SAP System"] },
  { name: "City Solar", country: "UAE", sector: "Renewable Energy / Solar", work: ["IoT-based Power Monitoring through HudHud Platform"] },
  { name: "NaiTel", country: "Jordan", sector: "Telecommunications", work: ["Data Center Thermal Audit","IoT-based Power Monitoring System","IoT-based Thermal Monitoring System using Smart Wireless T/H Sensors","Cloud-based Power Monitoring Platform for NaiTel's Clients"] },
  { name: "Galaxy Printing (Matbaet Al Majara)", country: "Jordan", sector: "Printing / Publishing", work: ["IoT Smart Power Meters"] },
  { name: "Joramco (Jordan Aircraft Maintenance Limited)", country: "Jordan", sector: "Aviation / Aircraft Maintenance", work: ["Smart System for Controlling 250 Split A/C Units using manufactured IR Smart Module & HudHud IoT Cloud Platform","IoT-Based Thermal Monitoring and Alerting System","IoT-Based Smart RFID for mobilizing Mainlifts & Forklift","Stand-alone and Cloud-based Noise Level Measurement"] },
  { name: "Al Faisaliah Healthcare Systems", country: "Jordan", sector: "Healthcare / Medical Systems", work: ["Cloud-Based Medical Equipment Monitoring & Alerting Platform"] },
  { name: "Atlas Medical", country: "Jordan", sector: "Healthcare / Medical Supplies & Equipment", work: ["IoT-Based Thermal Monitoring and Alerting System"] },
  { name: "Petra", country: "Jordan", sector: "Manufacturing / Industrial Engineering", work: ["IoT-Based Thermal Monitoring and Alerting System"] },
  { name: "BioEnergyTech", country: "Jordan", sector: "Health Supplements / Nutraceuticals", work: ["IoT-Based Thermal Monitoring and Alerting System"] },
  { name: "Smart Directions Trading", country: "Jordan", sector: "Trading / Technology Distribution", work: ["Cloud-based Temperature Mapping System using Smart Wireless T/H Sensors & Gateways"] },
  { name: "Qurtoba International Schools", country: "Jordan", sector: "Education / K-12 Private Schools", work: ["Smart System for Controlling ~150 Split A/C Units using manufactured IR Smart Module & HudHud IoT Cloud Platform"] },
  { name: "National Agricultural Research Center (NARC)", country: "Jordan", sector: "Agriculture / Scientific Research", work: ["Cloud-based Water Mixing Decision Support System using HudHud IoT Cloud Platform & Manufactured Control Units"] },
  { name: "Royal Health Awareness Society", country: "Jordan", sector: "Healthcare / Non-Profit", work: ["IoT-Based Thermal Monitoring and Alerting System"] },
  { name: "Hasad Vet Trading Company W.L.L.", country: "Kuwait", sector: "Veterinary / Animal Health", work: ["IoT-Based Thermal Monitoring and Alerting System"] },
  { name: "Jordan IoT", country: "Jordan", sector: "Technology / IoT Services", work: ["IoT / LoRaWAN Joint Projects"] },
  { name: "Convergent Technology", country: "KSA", sector: "Information Technology / Systems Integration", work: ["Cloud-based Thermal Commissioning Tool for Data Centers using Smart Wireless T/H Sensors & Gateways"] },
  { name: "NARC / Al Jaleel Society", country: "Jordan", sector: "Agriculture / Non-Profit Community Research", work: ["Designing an Anaerobic Digestion Biosolids (Scientific Research Project)"] },
  { name: "Almazraa Dairy", country: "Jordan", sector: "Food & Dairy / Agriculture", work: ["Smart Factory Monitoring System","Local & Cloud-based Monitoring","Water Level Monitoring","Water Flow Monitoring","Electricity Consumption Monitoring","Cold Rooms Temperature & Humidity Monitoring","Using own Manufactured Smart Gateways"] },
  { name: "Traklink", country: "Jordan", sector: "Technology / Tracking & Telematics", work: ["IoT / LoRaWAN Joint Projects"] },
  { name: "YKT", country: "Jordan", sector: "Industrial / Manufacturing", work: ["IoT-based Remote Control of Danfoss Motor Drive System"] },
];

export const FLAGS: Record<string, string> = { Jordan: "JO", KSA: "SA", UAE: "AE", Kuwait: "KW" };
