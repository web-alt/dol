window.DOL={content:{},scenes:[]};
DOL.content.t1={
objects:[
 {n:"A cup of tea",c:["Someone cultivates it","Someone transports it","A vendor sells it","Someone prepares it","Someone washes the cup"]},
 {n:"Water from a tap",c:["Someone maintains the pipes","Someone keeps it clean","Someone fixes it when it fails"]},
 {n:"The road to school",c:["Someone builds it","Someone repairs it","Someone sweeps it","Someone drives the vehicle on it"]},
 {n:"A clean street",c:["Someone sweeps it","Someone collects the waste","Someone stops the waste from piling up"]},
 {n:"A school day",c:["A teacher teaches","A helper opens and cleans the rooms","A guard watches the gate","Someone cooked the breakfast you ate"]},
 {n:"A parcel at the door",c:["Someone packs it","Someone drives it","Someone climbs the stairs to deliver it"]}],
tasks:[["Cooking","domestic"],["Cleaning","domestic"],["Childcare","care"],["Eldercare","care"]],
words:{Physical:"Effort of the body: carrying, building, farming, sweeping.",Mental:"Effort of the mind: teaching, planning, designing, deciding.",Service:"Effort for others: caring, cooking, driving, guarding, selling."},
ladder:["Professional","Office","Administrative","Manual","Service","Care","“Invisible”"],
jobs:[
 {n:"Farmer",x:12,y:22,t:"grows the food that cities depend on"},{n:"Teacher",x:36,y:12,t:"teaches students"},
 {n:"Doctor",x:62,y:20,t:"treats patients"},{n:"Engineer",x:86,y:14,t:"designs what others build"},
 {n:"Street vendor",x:20,y:52,t:"provides affordable goods and services directly to people"},{n:"Shopkeeper",x:46,y:42,t:"sells everyday goods"},
 {n:"Driver",x:74,y:50,t:"moves people and goods"},{n:"Construction worker",x:90,y:76,t:"builds schools, roads and homes"},
 {n:"Sanitation worker",x:10,y:84,t:"manages the waste that keeps public health from collapsing"},{n:"Security guard",x:34,y:78,t:"is part of the backbone of daily civic life"},
 {n:"Domestic worker",x:56,y:72,t:"makes it possible for others to go out to paid work"},{n:"Caregiver",x:76,y:88,t:"looks after children and the elderly"},
 {n:"School helper",x:50,y:92,t:"is part of the backbone of daily civic life"}],
edges:[[0,5],[0,4],[1,2],[1,3],[2,8],[2,10],[3,7],[4,5],[5,6],[6,7],[6,0],[8,4],[9,7],[10,11],[10,1],[11,2],[12,1],[12,9],[8,12]],
q1:"If a man is called to be a street sweeper, he should sweep streets even as Michelangelo painted, or Beethoven composed music, or Shakespeare wrote poetry.",
c1:"Martin Luther King Jr., “Life’s Blueprint”",hot1:["Michelangelo","Beethoven","Shakespeare"],
q2:"No work that is done in His name and dedicated to Him is small. All work when so done assumes equal merit.",c2:"Mahatma Gandhi"
};
/* content-t2.js: Topic 2 data. Needs content.js. */
DOL.content.t2={
pairs:[["Agricultural workers, tilling the soil for food","Urban infrastructure ceases to function."],["Sanitation workers, managing municipal waste","Public health rapidly collapses."]],
tasks:["Spinning","Farming","Cleaning latrines"],
q3:"He who eats without offering sacrifice eats stolen food. Sacrifice here can only mean bread labour.",c3:"Mahatma Gandhi, citing the Bhagavad Gita",
q4:"The caste system is not merely a division of labour. It is also a division of labourers.",c4:"Dr B.R. Ambedkar, Annihilation of Caste",hot4:["labour.","labourers."],
place:["Chicago","Chennai (then Madras)"],
sym:["Equitable working hours","Safe working environments","The right to form trade unions","Living wages","The dignity of every working individual"]
};
/* content-t3.js: Topic 3 data. Needs content.js. */
DOL.content.t3={
dayA:"An ordinary day.",
dayB:["They kept society running.","During COVID-19, sanitation workers, agricultural labourers, delivery personnel and domestic workers physically sustained society."],
roles:["Chai stall","Balloon seller","Bangle seller","Food cart","Knife sharpener"],
faces:["Harassment","Extortion","Eviction threats"],
unseen:["Sanitation workers","Domestic helpers","Security guards","Agricultural labourers","School support staff"],
gone:[["Sanitation workers","Municipal waste accumulates: immediate public health crises and epidemic outbreaks."],["Agricultural and supply-chain workers","Urban centres face catastrophic food shortages within days."],["Domestic and care workers","Other people’s participation in the formal workforce, particularly women’s, would plummet, stalling economic productivity."]]
};
/* content-t4.js: Topic 4 data. Needs content.js. */
DOL.content.t4={
a23:["Right to work","Free choice of employment","Just and favourable conditions","Equal pay for equal work","Protection against unemployment","Right to form and join trade unions"],
a24:["Rest and leisure","Reasonable limits on working hours","Periodic holidays with pay"],
arts:[["Article 21","The Right to Life includes the Right to Livelihood (Olga Tellis v. Bombay Municipal Corporation, 1985)."],["Article 23","Prohibits trafficking, begar and other forced labour, against the State and private actors."],["Article 39 · Directive Principle","Equal pay for equal work and protection of workers’ health."],["Article 43 · Directive Principle","A living wage, decent standards of life and full enjoyment of leisure."]],
pillars:[["Employment creation","Inclusive access to productive work and a fair income."],["Rights at work","No forced or child labour, non-discrimination, a living wage."],["Social protection","Safe conditions, free time, healthcare, pensions, parental leave."],["Social dialogue","The right to organise, form trade unions and negotiate collectively."]]
};
/* content-t5.js: Topic 5 data. Needs content.js. */
DOL.content.t5={
roles:["Sanitation","Waste management","Leatherwork","Sweeping"],
labels:["Polluting","Impure"],
st:[["1993","The 1993 Act","Manual scavenging is legally prohibited under the 1993 Act."],
 ["2013","The 2013 Act","The 2013 Act prohibits it too. Yet people were still forced to enter and clean toxic sewers and septic tanks by hand: institutional apathy and entrenched caste dynamics."],
 ["2014","Safai Karamchari Andolan v. Union of India","The Supreme Court delivered a scathing indictment: despite Article 17 (abolishing untouchability) and Article 21 (the right to a dignified life), the state had fundamentally failed these workers."],
 ["₹10 lakh","compensation, mandated in the 2014 judgment","The Court ordered manual scavenging eradicated and the workers rehabilitated, and mandated compensation to the families of everyone who died in a sewer or septic tank accident since 1993. Protecting their lives and dignity became a human rights imperative."]]
};
/* content-t6.js: Topic 6 data. Needs content.js. */
DOL.content.t6={
emp:[["Self-employed (incl. unpaid helpers)",56.2],["Regular wage or salaried",23.6],["Casual labour",20.2]],
gig:[[7.7,"million (77 lakh) workers in the gig economy, 2020-21, estimated by a 2022 NITI Aayog policy brief","2.6% of the non-agricultural workforce.",2.6],[23.5,"million (2.35 crore) projected by 2029-30","6.7% of the non-agricultural workforce, driven by platforms in e-commerce, ride-hailing and logistics.",6.7]],
lost:["Minimum wage guarantees","Health insurance","Paid sick leave","Formal grievance redressal"],
fl:41.7,ml:79,es:30.98
};
/* content-t7.js: Topic 7 data. Needs content.js. */
DOL.content.t7={
rita:{n:8000,u:"monthly salary of Rita akka, a hearing and speech-impaired contract labourer for the city corporation in Chennai",c:"She sweeps vast streets using bleaching powder with her bare hands, with no gloves or protective shoes. Her feet have chronic blisters, and an occupational accident partially impaired her vision.",z:"Yet she spends a significant portion of her income feeding stray dogs and cats along her route."},
amulu:{n:45,u:"kilometres of travel, on multiple modes of transport, to procure 60 to 80 kilograms of vegetables",c:"Her day begins before dawn. She then spends the entire day walking through neighbourhoods pushing a heavy wooden cart, in extreme weather and with a severe lack of basic public amenities, such as restrooms."},
q5:{t:"But in society, the labour of women like me rarely gets noticed or respected.",h:["noticed","respected."],c:"Amulu, vegetable street vendor"},
q6:{t:"I did not know it was illegal. After his death, too, I did not know that there are laws for my family to receive compensation.",h:["illegal."],c:"Gudla Mangamma, Hyderabad"},
m:{c:"Her husband, a daily wage worker desperate to fund his daughter\u2019s education, went into a clogged sewer in 2016 without any safety gear, to rescue a collapsing coworker. Both men died. She was left widowed and unaware of the laws protecting her."},
bhateri:{n:50,u:"a month: what Bhateri Devi in Mumbai earned cleaning 15\u201316 homes and toilets in one building",c:"She spent her entire life at this work, surviving mostly on leftover food given by residents, trapped by the \u201cthread of destiny\u201d dictated by her caste."},
q7:{t:"I don\u2019t believe in caste and there should be no discrimination on the basis of caste or religion.",h:["caste","religion."],c:"Shyla, nursing student"},
ld:"From superficial sympathy to structural accountability.",
lc:[["The stories expose a stark disparity between the essential nature of foundational work and the expendability of the workers performing it."],["Lack of systemic protection and caste-based occupational assignment force vulnerable people into lethal situations: the two deaths in these accounts were not merely accidents, but consequences of economic desperation meeting institutional negligence."]],
needl:"Occupational dignity is impossible without",need:["Safe working conditions","Fair living wages","Genuine societal respect"]
};
/* content-t8.js: Topic 8 data. Needs content.js. */
DOL.content.t8={
st:[
{id:'s45',l:'Everyday respect.',h:'Dignity begins at the interpersonal level: basic courtesy, genuine appreciation and fair financial treatment.',c:'Use respectful titles for domestic helpers, security guards and sanitation workers, not derogatory terms. Thank them for their vital civic service. Give them clean drinking water, adequate restrooms and acceptable resting periods.'},
{id:'s46',l:'Fair treatment.',h:'Empathy must be manifested in everyday transactions.',c:'End the culture of aggressive haggling with impoverished street vendors. Their marginal profits represent daily survival and their children\u2019s education, not corporate excess.'},
{id:'s47',l:'Action plan: a roadmap for a respectful community.',h:'Structural awareness must translate into actionable community engagement.'},
{id:'s48',l:'Personal reflection.',h:'These workers are no longer viewed as invisible, lowly service providers, but are rightfully recognized as the indispensable pillars of the economy.',c:'Middle-class and elite societal privileges are heavily subsidized by the undercompensated and hazardous labour of the marginalized.',pl:'The research looked at',p:[['The severe time poverty of women in unpaid care work'],['The lethal risks sanitation workers take daily'],['The precarious, rapidly expanding gig economy']]},
{id:'s49',l:'Conclusion.',h:'No civilized society can thrive, nor claim to be just, while degrading the hands that build, feed, and clean it.',c:'The Constitution of India and the ILO Decent Work Agenda offer the structural scaffolding for equity. Realizing it takes a collective commitment to eradicate caste-based occupational stigma and gendered exploitation.',q:'As Gandhi noted, \u201cno labour is too mean for one who wants to earn an honest penny.\u201d'},
{id:'s50',l:'My SEWA Promise.',h:'A pledge to actively uphold the dignity of all occupations.',p:[['Extend basic courtesy to one and all'],['Champion the rights of the marginalized'],['Never participate in the stigmatization of any honest toil']]}],
plan:[['Awareness campaigns','Street plays, poster marches and community discussions to dismantle the stigma of manual labour and to teach the public the human rights of workers.'],['Community integration and interviews','Regular, respectful interaction between students and the school\u2019s support staff, to understand their daily challenges and validate their contributions.'],['Material support and advocacy','Collections in cash or kind on Labour Day (May 1) or New Year, and help for domestic workers and vendors to register for welfare schemes such as e-Shram.'],['Monitoring compliance','Neighbourhood-level vigilance so that hazardous practices, such as manual scavenging without protective gear or child labour, are reported and eradicated.']],
fin:'Dignity of labour.'
};

/* content-v2.js: V2 media. Images load from Wikimedia Commons (Special:FilePath); a failed load removes the figure. */
DOL.media={
 varanasi:{src:"https://commons.wikimedia.org/wiki/Special:FilePath/India02_(10705160464).jpg?width=1600",alt:"A boat market on the river at Varanasi, India",credit:"Boat market, Varanasi. Dirk Guinan / DFAT, CC BY 2.0"},
 maize:{src:"https://commons.wikimedia.org/wiki/Special:FilePath/Roadside_maize_vendor_in_India.jpg?width=1000",alt:"A roadside maize vendor in India",credit:"Roadside maize vendor. Babasteve, CC BY 2.0"}};

/* content-t4rw (CP23): copy for S22W, the interactive 3D rights model. Provision text is reused from t4 (a23, a24, arts, pillars); captions are headings only. */
DOL.content.t4.rw={caps:[["The Universal Declaration of Human Rights.","1948. 10 December, now Human Rights Day."],["The Constitution of India.",""],["Decent work.","Four pillars of the ILO Decent Work Agenda, formalised in 1999."],["Three frameworks. One roof.","Dignity of labour. Select any part to read it."]],
nm:["UDHR","Constitution","Decent work"],hd:["Universal Declaration of Human Rights, 1948","Constitution of India","ILO Decent Work Agenda, 1999"],hint:["Select a framework","Or touch any part of the model."]};

DOL.content.cover={
title:"Dignity of Labour",
tagline:"An interactive exhibition on work, rights and respect in India.",
kicker:"A Class 12 CBSE Work Experience (SEWA) project",
badge:"SEWA · Class 12 · 2026–27",
facts:["8 chapters","Class 12 · CBSE","Work Experience (SEWA)","2026–27"],
chapters:[
 {name:"What we call work",color:"#F2A900",href:"#topic-1"},
 {name:"Why it matters",color:"#7C97FF",href:"#topic-2"},
 {name:"The people behind everyday life",color:"#FF7A2B",href:"#topic-3"},
 {name:"Dignity and human rights",color:"#F25C54",href:"#topic-4"},
 {name:"When dignity is denied",color:"#E07B3C",href:"#topic-5"},
 {name:"India in context",color:"#2FC4C4",href:"#topic-6"},
 {name:"Real stories and voices",color:"#FF3FA4",href:"#topic-7"},
 {name:"What can change",color:"#14C27A",href:"#topic-8"}
],
team:[
 ["Project Head","Shree Kumaran"],
 ["Technical Lead, Domain & Deployment","Mithun"],
 ["Content Research & Documentation","Prithvi Raj, Sowmesh"],
 ["3D Visual Design & Planning","Devesh, Adesh"],
 ["Testing & Debugging","Sachiv Sarathi"]
],
cta:"Begin the exhibition",ctaHref:"#s0",cue:"Scroll"
};
