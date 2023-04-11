export interface WorkExperienceData {
  startDate: string;
  endDate?: string;
  companyName: string;
  subCompanyName?: string;
  jobTitle: string;
  jobDescription: string;
  technologies?: string[];
  jobType?: "Contractor";
}

export default [
  {
    startDate: "2022",
    companyName: "Meta",
    subCompanyName: "Kustomer (New York)",
    jobTitle: "Senior Software Engineer",
    jobType: "Contractor",
    technologies: ["React", "Node.JS"],
    jobDescription: `At Meta, I work within Kustomer, a platform that allows businesses to manage all their communication channels in one place. Here, I develop applications and provide feedback on UX to improve the platform. 

    Currently, I am working on a design system that will be open-sourced, enabling external developers to develop standardized applications that align with our brand. 
    
    This makes our application review process easier, provides a better, faster and more consistent development experience, and offers a more consistent application experience for end-users.`,
  },
  {
    startDate: "2022",
    companyName: "X-Team",
    subCompanyName: "Groundswell (California)",
    jobTitle: "Senior Software Engineer",
    technologies: ["React", "React Native", "Node.JS"],
    jobDescription: `X-Team works with big, innovative brands like Coinbase, Riot Games, Fox Broadcasting, Twitter, Sony, Intel, Beachbody, Kaplan Inc., and more.

    At X-Team, I work for a fintech company in California called Groundswell, developing a donation platform for businesses and employees. My focus is on the main application, which is built using React Native. 
    
    I aim to help people and promote a culture of robust testing to ensure that anyone can safely refactor our code. As a financial platform, we have implemented various security standards, such as SOC2. I am currently working on a complete platform rewrite, which involves switching from GO to Node.JS stack.`,
  },
  {
    startDate: "2020",
    endDate: "2022",
    companyName: "Zé Delivery",
    subCompanyName: "Anheuser-Busch InBev",
    jobTitle: "Frontend Engineer III",
    technologies: ["React", "React Native", "Node.JS"],
    jobDescription: `Zé Delivery is Brazil's largest beverage delivery app, with millions of users, powered by Anheuser-Busch InBev.

    In this role, I contributed to the development of a better user experience in the main application as part of the Consumer Purchase team, focusing on improving user price perception and conversion.
    
    During this time, I reduced technical debt by refactoring the "browse" feature, which accounted for about 1/3 of the application, significantly decreasing development delivery time.
    
    I also developed a robust implementation for handling deep links, boosting our marketing campaigns, and assisted in creating Mozeic, our design system that is currently under construction.
    
    Additionally, I interviewed potential team members and created a new API for our Code Challenge using Node.js.`,
  },
  {
    startDate: "2019",
    endDate: "2020",
    companyName: "Alfred Delivery",
    jobTitle: "Software Engineer",
    technologies: ["React Native", "Node.JS"],
    jobDescription: ` Alfred Delivery is a delivery app focused on more miniature cities and remote areas in Brazil. It currently has franchises in over 90 cities.

I was responsible for maintaining and adding minor features to our production app in Ionic 3. After a few months, I got to rewrite the app in React Native, entirely revamping the interface while drastically improving performance.`,
  },
  {
    startDate: "2015",
    endDate: "2019",
    companyName: "Micro Import Group",
    jobTitle: "Full Stack Developer",
    technologies: ["React", "Node.JS", "PHP"],
    jobDescription: `Micro Import is a Premium Apple Service Provider in Brazil, inside the state of São Paulo - The best and first one in the region.

    While there, I got to go from an authorized technician to a developer in 2017. As a first development-focused job, it was under my umbrella, making from ground-up WordPress templates for all companies in the group and internal management software.`,
  },
] as WorkExperienceData[];
