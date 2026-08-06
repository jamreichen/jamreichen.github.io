/*
  Spoof Detective: A Phishing Simulation
  Scenario bank and curriculum metadata.
  All organizations, accounts, links, phone numbers, and identities are fictional simulations.
  Reserved example domains are used for non-official destinations.
*/
(function () {
  "use strict";

  const VERSION = "4.1.0";

  const COMPETENCIES = {
    social_engineering: {
      id: "social_engineering",
      name: "Social Engineering Analysis",
      short: "Persuasion tactics",
      description: "Recognize how urgency, authority, fear, trust, scarcity, and curiosity influence decisions."
    },
    identity_verification: {
      id: "identity_verification",
      name: "Identity Verification",
      short: "Verify people and services",
      description: "Confirm an identity through an independent, trusted channel rather than the message itself."
    },
    domain_analysis: {
      id: "domain_analysis",
      name: "Domain and Link Analysis",
      short: "Read destinations",
      description: "Identify the registered domain, inspect destinations, and distinguish a display name from an address."
    },
    data_protection: {
      id: "data_protection",
      name: "Sensitive Data Protection",
      short: "Protect private data",
      description: "Recognize inappropriate requests for passwords, recovery codes, financial data, and personal information."
    },
    authentication: {
      id: "authentication",
      name: "Authentication Security",
      short: "Secure account access",
      description: "Use passwords, multifactor authentication, sessions, recovery methods, and permissions safely."
    },
    defensive_controls: {
      id: "defensive_controls",
      name: "Defense in Depth",
      short: "Choose layered controls",
      description: "Select preventive, detective, and corrective safeguards instead of relying on one person or one tool."
    },
    evidence_analysis: {
      id: "evidence_analysis",
      name: "Digital Evidence Analysis",
      short: "Interpret artifacts",
      description: "Compare messages, headers, permissions, account activity, logs, and policies to support a conclusion."
    },
    incident_response: {
      id: "incident_response",
      name: "Incident Response",
      short: "Contain and recover",
      description: "Prioritize reporting, containment, evidence preservation, recovery, and notification steps."
    },
    risk_communication: {
      id: "risk_communication",
      name: "Risk Communication",
      short: "Explain decisions",
      description: "Communicate evidence, uncertainty, impact, and recommended action to technical and nontechnical audiences."
    },
  };

  const MISSION_STANDARDS = {
    recognize: [
      "CSTA 2026 · Cybersecurity Specialty I: Social Engineering",
      "CYBER.ORG 9–12 · Threats and Vulnerabilities",
      "NICE · Cybersecurity knowledge and skill development"
    ],
    verify: [
      "CSTA 2026 · Cybersecurity Specialty I: Identity and Trust",
      "CYBER.ORG 9–12 · Authentication and Access",
      "AP Cybersecurity · Analyze Risk"
    ],
    protect: [
      "CSTA 2026 · Cybersecurity Specialty I: Security Controls",
      "CYBER.ORG 9–12 · Layered Defenses",
      "AP Cybersecurity · Mitigate Risk"
    ],
    investigate: [
      "CSTA 2026 · Cybersecurity Specialty II: Evidence and Monitoring",
      "CYBER.ORG 9–12 · Incident Detection",
      "AP Cybersecurity · Detect Attacks"
    ],
    respond: [
      "CSTA 2026 · Cybersecurity Specialty II: Incident Response",
      "CYBER.ORG 9–12 · Risk and Response",
      "AP Cybersecurity · Collaborate and Communicate"
    ]
  };

  const MISSIONS = [
    {
      id: "recognize",
      number: 1,
      title: "Recognize the Manipulation",
      subtitle: "Observe before you act",
      color: "#50e6ff",
      summary: "Identify social-engineering tactics and distinguish decisive evidence from attention-grabbing details.",
      objective: "Explain how a message attempts to influence the recipient and support a decision with evidence.",
      tags: ["Urgency", "Authority", "Fear", "Rewards", "Trust"],
      competencies: ["social_engineering", "identity_verification"],
      passScore: 70,
      defaultCases: 4,
      showEvidenceTotal: true
    },
    {
      id: "verify",
      number: 2,
      title: "Verify Identity and Destination",
      subtitle: "Trust evidence, not appearance",
      color: "#84baff",
      summary: "Inspect sender details, registered domains, links, QR destinations, calendar invitations, and app publishers.",
      objective: "Use an independent trusted channel to verify a person, service, destination, or request.",
      tags: ["Domains", "Links", "QR Codes", "OAuth", "Trusted Channels"],
      competencies: ["identity_verification", "domain_analysis", "data_protection"],
      passScore: 70,
      defaultCases: 4,
      showEvidenceTotal: false
    },
    {
      id: "protect",
      number: 3,
      title: "Protect Accounts and Data",
      subtitle: "Apply layered defenses",
      color: "#75f0bc",
      summary: "Choose authentication, access, permission, network, and recovery controls that reduce risk.",
      objective: "Recommend preventive, detective, and corrective controls for a realistic security situation.",
      tags: ["MFA", "Permissions", "Recovery", "Wi-Fi", "Defense in Depth"],
      competencies: ["authentication", "data_protection", "defensive_controls"],
      passScore: 70,
      defaultCases: 4,
      showEvidenceTotal: false
    },
    {
      id: "investigate",
      number: 4,
      title: "Investigate the Incident",
      subtitle: "Connect evidence across artifacts",
      color: "#cba7ff",
      summary: "Use account activity, headers, logs, attachments, and message history to determine what occurred.",
      objective: "Construct an evidence-based incident explanation and identify indicators of compromise.",
      tags: ["Logs", "Headers", "Account Activity", "Timelines", "Indicators"],
      competencies: ["evidence_analysis", "domain_analysis", "incident_response"],
      passScore: 70,
      defaultCases: 4,
      showEvidenceTotal: false
    },
    {
      id: "respond",
      number: 5,
      title: "Respond and Communicate",
      subtitle: "Contain, recover, and explain",
      color: "#ffd878",
      summary: "Prioritize response steps, preserve evidence, recover affected accounts, and communicate clearly.",
      objective: "Develop and communicate an appropriate response to a cybersecurity incident or uncertain request.",
      tags: ["Containment", "Recovery", "Notification", "Evidence", "Communication"],
      competencies: ["incident_response", "risk_communication", "defensive_controls"],
      passScore: 70,
      defaultCases: 4,
      showEvidenceTotal: false
    }
  ];

  const BADGES = [
    {
      id: "evidence_analyst",
      name: "Evidence-Based Analyst",
      description: "Supported five decisions with strong evidence instead of a surface-level guess.",
      icon: "E"
    },
    {
      id: "verification_specialist",
      name: "Verification Specialist",
      description: "Correctly used an independent trusted channel in three cases.",
      icon: "V"
    },
    {
      id: "domain_detective",
      name: "Domain Detective",
      description: "Demonstrated proficiency in domain and destination analysis.",
      icon: "D"
    },
    {
      id: "incident_responder",
      name: "Incident Responder",
      description: "Correctly prioritized three containment and recovery sequences.",
      icon: "I"
    },
    {
      id: "clear_communicator",
      name: "Clear Communicator",
      description: "Selected evidence-centered explanations in five cases.",
      icon: "R"
    },
    {
      id: "defense_in_depth",
      name: "Defense in Depth",
      description: "Applied layered safeguards across authentication, access, and recovery cases.",
      icon: "L"
    },
    {
      id: "spoof_detective_master",
      name: "Spoof Detective Master",
      description: "Reached proficiency in all five missions.",
      icon: "P"
    }
  ];

  const ACTIONS = {
    report: {
      id: "report",
      label: "Report and block",
      short: "Report",
      description: "Use the platform or organization reporting process, then block or quarantine the artifact."
    },
    verify: {
      id: "verify",
      label: "Verify through a trusted channel",
      short: "Verify",
      description: "Contact the person or service using a known directory, saved number, or site opened independently."
    },
    proceed: {
      id: "proceed",
      label: "Proceed with normal caution",
      short: "Proceed",
      description: "Continue because the evidence supports legitimacy, while using normal account and privacy safeguards."
    },
    escalate: {
      id: "escalate",
      label: "Escalate to IT or security",
      short: "Escalate",
      description: "Notify the responsible technical team because compromise, privileged access, or organizational impact may exist."
    }
  };

  const ASSESSMENTS = {
    malicious: {
      id: "malicious",
      label: "Likely malicious",
      description: "The evidence supports phishing, impersonation, account abuse, or another attack."
    },
    uncertain: {
      id: "uncertain",
      label: "Insufficient evidence — verify",
      description: "The message may be legitimate or compromised; confirm through an independent source."
    },
    legitimate: {
      id: "legitimate",
      label: "Appears legitimate",
      description: "The evidence supports a normal, expected interaction without a material security concern."
    }
  };

  function E(id, label, detail, strength, polarity, source) {
    return { id, label, detail, strength, polarity, source };
  }

  function I(id, label, icon, result, evidence, technical) {
    return { id, label, icon, result, evidence: evidence || [], technical: technical || "" };
  }

  function S(config) {
    const scenario = Object.assign({
      version: VERSION,
      assessmentSet: null,
      persuasion: [],
      response: null,
      hints: [],
      misconceptionTags: [],
      competencies: [],
      standards: [],
      nearTransferId: null,
      minEvidence: 2,
      maxEvidence: 3
    }, config);

    scenario.standards = scenario.standards.length
      ? scenario.standards
      : (MISSION_STANDARDS[scenario.mission] || []).slice();

    scenario.rationales = [
      { id: "best", text: scenario.rationale, correct: true },
      { id: "weak", text: scenario.distractors[0], correct: false },
      { id: "incorrect", text: scenario.distractors[1], correct: false }
    ];

    return scenario;
  }

  const scenarios = [];

  /* Mission 1: Recognize the Manipulation */
  scenarios.push(
    S({
      id: "r-school-it-reset",
      mission: "recognize",
      title: "Two-Hour Password Deadline",
      type: "email",
      technique: "Credential phishing",
      persuasion: ["Authority", "Urgency", "Fear"],
      context: "A student receives this message during the school day. They did not request a password reset.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "Lincoln High IT Services",
        fromAddress: "helpdesk@lincoln-reset.example",
        replyTo: "support@lincoln-reset.example",
        to: "alex@students.lincoln-hs.example",
        date: "10:14 AM",
        subject: "Action required: password expires in 2 hours",
        body: [
          "Hello Alex,",
          "Your school account will be locked in two hours unless you confirm your password. This affects email, assignments, and class registration.",
          "Use the secure reset link below immediately.",
          "IT Services"
        ],
        link: { text: "Keep my school account active", url: "https://lincoln-reset.example/session" }
      },
      inspections: [
        I("sender", "Sender details", "identity", "The display name says Lincoln High, but the address ends in lincoln-reset.example rather than the school's lincoln-hs.example domain.", ["domain_mismatch"]),
        I("link", "Link preview", "link", "The button leads to lincoln-reset.example/session. It does not open the school's normal account portal.", ["credential_destination"]),
        I("language", "Message language", "message", "The message combines a two-hour deadline with loss of class access to push the reader into acting quickly.", ["forced_urgency"]),
        I("policy", "School account policy", "policy", "The published policy says students reset passwords by opening the portal directly; IT never asks students to confirm an existing password by email.", ["policy_conflict"])
      ],
      evidence: [
        E("domain_mismatch", "Sender domain does not match the school", "The display name is easy to copy; the address uses a separate registered domain.", "strong", "risk", "sender"),
        E("credential_destination", "The reset link leaves the school domain", "The destination could collect school credentials on a look-alike page.", "strong", "risk", "link"),
        E("forced_urgency", "The message creates a two-hour crisis", "Urgency is a persuasion tactic, but it is not proof by itself.", "moderate", "risk", "language"),
        E("policy_conflict", "The request conflicts with published school policy", "A known policy provides independent evidence that this workflow is not legitimate.", "strong", "risk", "policy")
      ],
      bestEvidence: ["domain_mismatch", "credential_destination", "policy_conflict"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "The sender and reset destination are outside the school's registered domain, and the request conflicts with the school's known reset process.",
      distractors: [
        "The message uses urgent words, so every message like this should be treated as phishing.",
        "The email uses the student's name, so the sender must have access to the real school system."
      ],
      hints: [
        "Start with identity: compare the address after the @ symbol with the school's normal domain.",
        "Preview the reset destination without opening it.",
        "Check whether the requested workflow matches the school's published password policy."
      ],
      misconceptionTags: ["Trusted display name", "Urgency as proof", "Personalization equals legitimacy"],
      competencies: ["social_engineering", "identity_verification", "domain_analysis", "data_protection"],
      nearTransferId: "r-scholarship-award",
      consequence: {
        ideal: "The message is reported and quarantined before credentials are entered. IT blocks the destination for other students.",
        unsafe: "A student enters a password on the look-alike page. The attacker uses the account to send the same message to classmates."
      },
      debrief: {
        what: "Credential phishing that impersonates a school authority and uses urgency to obtain a student password.",
        strongest: "The off-domain sender, off-domain reset page, and conflict with the known school process are decisive together.",
        inconclusive: "Urgency and personalization increase concern, but neither one proves that a message is malicious.",
        next: "Report the message, then open the school portal independently or contact IT using the school directory.",
        plain: "The email sends students to the wrong website to steal a school password. Report it and use the real school portal instead."
      }
    }),

    S({
      id: "r-codeforge-welcome",
      mission: "recognize",
      title: "Expected Coding Platform Welcome",
      type: "email",
      technique: "Legitimate account onboarding",
      persuasion: ["Familiarity"],
      context: "Alex created a CodeForge Classroom account five minutes ago using a school invitation.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "CodeForge Classroom",
        fromAddress: "noreply@codeforge.school.example",
        replyTo: "support@codeforge.school.example",
        to: "alex@students.lincoln-hs.example",
        date: "3:06 PM",
        subject: "Your CodeForge classroom is ready",
        body: [
          "Hi Alex,",
          "Your account is ready. You can create a repository, read the classroom starter guide, or invite a project partner.",
          "No action is required. Open CodeForge from your school applications page whenever you are ready.",
          "CodeForge Classroom Team"
        ],
        link: { text: "codeforge.school.example", url: "https://codeforge.school.example" }
      },
      inspections: [
        I("sender", "Sender details", "identity", "The message comes from noreply@codeforge.school.example and the reply address uses the same registered domain.", ["consistent_domain"]),
        I("context", "Recent activity", "history", "The account-creation record shows Alex accepted a school invitation five minutes before this email arrived.", ["expected_context"]),
        I("link", "Link preview", "link", "The visible destination and actual destination are both codeforge.school.example.", ["matching_destination"]),
        I("request", "Requested information", "shield", "The message does not request a password, payment, recovery code, or personal data.", ["no_sensitive_request"])
      ],
      evidence: [
        E("consistent_domain", "Sender and reply address use the expected domain", "The addresses are internally consistent with the fictional service.", "strong", "safe", "sender"),
        E("expected_context", "The message follows an action the student just completed", "Expected timing is meaningful evidence when combined with identity checks.", "strong", "safe", "context"),
        E("matching_destination", "The visible and actual destinations match", "The link stays on the expected registered domain.", "strong", "safe", "link"),
        E("no_sensitive_request", "No sensitive information is requested", "Absence of a sensitive request supports legitimacy but is not sufficient alone.", "moderate", "safe", "request")
      ],
      bestEvidence: ["consistent_domain", "expected_context", "matching_destination"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The message is expected, the sender and destination use the same known domain, and it does not ask the student to reveal sensitive information.",
      distractors: [
        "The message looks professional and has no spelling errors, so it is safe.",
        "Any welcome email is harmless because a new account cannot contain valuable information."
      ],
      hints: [
        "Compare the message with the student's recent activity.",
        "Check whether the sender, reply address, and destination are consistent.",
        "Look for a request that would expose credentials, money, or private data."
      ],
      misconceptionTags: ["Professional appearance equals legitimacy", "No spelling errors equals safe"],
      competencies: ["identity_verification", "domain_analysis"],
      nearTransferId: "r-club-fundraiser",
      consequence: {
        ideal: "The student opens the service through the school applications page and continues the expected setup.",
        unsafe: "Unnecessary reporting creates a false positive and delays a normal classroom activity."
      },
      debrief: {
        what: "A legitimate, expected onboarding message from a fictional school coding platform.",
        strongest: "Expected context plus consistent identity and destination evidence supports proceeding.",
        inconclusive: "Professional design, friendly wording, and correct grammar are weak indicators because attackers can reproduce them.",
        next: "Proceed normally, preferably by opening the service from the school applications page rather than relying on the email link.",
        plain: "This message matches something Alex just did and uses the correct website. It is reasonable to continue."
      }
    }),

    S({
      id: "r-scholarship-award",
      mission: "recognize",
      title: "Unrequested Scholarship Award",
      type: "email",
      technique: "Advance-fee and identity theft phishing",
      persuasion: ["Reward", "Scarcity", "Authority"],
      context: "The student has applied to several colleges but has never heard of the Future Scholars National Fund.",
      artifact: {
        kind: "email",
        app: "Personal Mail",
        fromName: "National Scholarship Review Board",
        fromAddress: "awards@future-scholars.example",
        replyTo: "claims@award-processing.example",
        to: "alex.student@example.net",
        date: "8:41 PM",
        subject: "FINAL NOTICE: Claim your $8,500 student award",
        body: [
          "Dear Selected Student,",
          "Your academic profile has been chosen for an $8,500 scholarship. Only twelve awards remain.",
          "To release the funds, confirm your date of birth, last four Social Security digits, and pay a refundable $29 processing charge by midnight.",
          "Scholarship Review Office"
        ],
        link: { text: "Claim award before midnight", url: "https://future-scholars.example/claim" }
      },
      inspections: [
        I("sender", "Sender and reply details", "identity", "The sender and reply-to addresses use two different generic domains. Neither connects to a known scholarship organization or prior application.", ["unknown_identity"]),
        I("request", "Information requested", "shield", "The form asks for Social Security digits, birth date, and a payment before releasing an award.", ["sensitive_request", "advance_fee"]),
        I("language", "Persuasion tactics", "message", "The message combines a large reward, limited availability, and a midnight deadline.", ["reward_pressure"]),
        I("history", "Application history", "history", "There is no application, nomination, or prior communication from this organization.", ["no_prior_relationship"])
      ],
      evidence: [
        E("unknown_identity", "The sender cannot be connected to a known organization", "Generic domains and an unrelated reply address make the claimed identity unverifiable.", "strong", "risk", "sender"),
        E("sensitive_request", "The claim form requests identity data", "Birth date and Social Security digits could support identity theft.", "strong", "risk", "request"),
        E("advance_fee", "The award requires an upfront payment", "A processing charge before receiving an unsolicited award is a classic advance-fee pattern.", "strong", "risk", "request"),
        E("reward_pressure", "A valuable reward is tied to a short deadline", "Scarcity and reward pressure are manipulation tactics, but they are supporting evidence.", "moderate", "risk", "language"),
        E("no_prior_relationship", "There is no application or prior relationship", "An unsolicited award lacks a plausible, verifiable origin.", "strong", "risk", "history")
      ],
      bestEvidence: ["sensitive_request", "advance_fee", "no_prior_relationship"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "An unsolicited organization is requesting identity data and an upfront fee before releasing a reward the student never applied for.",
      distractors: [
        "The amount is unusually high, so scholarships above a certain dollar value are always scams.",
        "The message mentions academics and college, so it probably came from a school database."
      ],
      hints: [
        "Ask what the student did to become eligible for this award.",
        "Identify every piece of information or money requested before the award is released.",
        "Separate the emotional appeal of the reward from verifiable evidence."
      ],
      misconceptionTags: ["Reward overrides verification", "Education theme equals legitimacy", "Urgency as proof"],
      competencies: ["social_engineering", "data_protection", "identity_verification"],
      nearTransferId: "v-college-score",
      consequence: {
        ideal: "The message is reported. The student searches for scholarships through a counselor or a known scholarship database instead.",
        unsafe: "The student loses the processing fee and exposes identity information that can be reused in later fraud."
      },
      debrief: {
        what: "A combined scholarship, advance-fee, and identity-theft scam aimed at students planning for college.",
        strongest: "The sensitive-data request, upfront fee, and lack of any application or relationship are decisive.",
        inconclusive: "A large award, formal title, or urgent deadline may raise concern but does not prove fraud by itself.",
        next: "Report the message and verify scholarships through a counselor or a known official source opened independently.",
        plain: "The sender offers money the student never applied for, then asks for private data and a fee. Report it."
      }
    }),

    S({
      id: "r-teacher-grade-share",
      mission: "recognize",
      title: "Late-Night Grade Document",
      type: "email",
      technique: "Potential compromised-account message",
      persuasion: ["Authority", "Familiarity", "Curiosity"],
      context: "The message comes from a real teacher account, but Alex was not expecting a grade document and the teacher normally posts feedback in the LMS.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "Ms. Rivera",
        fromAddress: "mrivera@lincoln-hs.example",
        replyTo: "mrivera@lincoln-hs.example",
        to: "alex@students.lincoln-hs.example",
        date: "1:42 AM",
        subject: "Can you review this before class?",
        body: [
          "Alex,",
          "I added comments to your grade review. Please open the shared document before first period and tell me whether the total looks right.",
          "Thanks, Ms. Rivera"
        ],
        link: { text: "Open shared grade review", url: "https://docs.schoolcloud.example/document/example" }
      },
      inspections: [
        I("sender", "Sender details", "identity", "The message was sent from Ms. Rivera's normal school address; the reply address matches.", ["official_account"]),
        I("link", "Link preview", "link", "The destination is docs.schoolcloud.example, a legitimate cloud-document domain. A legitimate platform can still contain harmful or unexpected content.", ["legitimate_platform"]),
        I("history", "Prior communication", "history", "Ms. Rivera normally posts feedback in the LMS and has not mentioned a grade review. The timing is unusual but not impossible.", ["unexpected_context"]),
        I("request", "Requested action", "message", "The message asks only to open a document and respond; it does not directly request a password or private data.", ["limited_request"])
      ],
      evidence: [
        E("official_account", "The message comes from the teacher's normal account", "This supports legitimacy, but a real account can be compromised.", "strong", "safe", "sender"),
        E("legitimate_platform", "The link uses a real cloud-document platform", "This reduces look-alike-domain risk but does not prove that the document is safe or intended.", "moderate", "safe", "link"),
        E("unexpected_context", "The request does not match the teacher's normal workflow", "Unexpected timing and process create enough uncertainty to verify independently.", "strong", "risk", "history"),
        E("limited_request", "No credentials or sensitive data are requested in the message", "This is reassuring but does not rule out a harmful document or later login prompt.", "moderate", "safe", "request")
      ],
      bestEvidence: ["official_account", "legitimate_platform", "unexpected_context"],
      correctAssessment: "uncertain",
      correctAction: "verify",
      rationale: "The account and destination look legitimate, but the unexpected request does not match the teacher's normal process, so the student's next step should be independent verification.",
      distractors: [
        "The email arrived after midnight, so it must be malicious.",
        "The message comes from a school account and uses SchoolCloud Docs, so verification is unnecessary."
      ],
      hints: [
        "Look for both reassuring and concerning evidence rather than forcing an immediate yes-or-no answer.",
        "Ask whether a legitimate account can ever be used by someone else.",
        "Identify a trusted way to contact the teacher that does not depend on this message."
      ],
      misconceptionTags: ["Legitimate platform equals safe", "Official account cannot be compromised", "Odd time equals malicious"],
      competencies: ["social_engineering", "identity_verification"],
      nearTransferId: "v-drive-share",
      consequence: {
        ideal: "Alex messages Ms. Rivera through the LMS or asks in person. The request is confirmed before the document is opened.",
        unsafe: "Alex assumes the real account guarantees safety and follows a later login prompt without checking."
      },
      debrief: {
        what: "An ambiguous message that could be legitimate or could have been sent from a compromised teacher account.",
        strongest: "The real account and real platform are reassuring, while the unexpected workflow creates unresolved uncertainty.",
        inconclusive: "Late timing is unusual, but teachers may schedule or send messages at many times. It is not proof of compromise.",
        next: "Verify through the LMS, a known school directory, or an in-person conversation before opening the document.",
        plain: "The message might be real, but it is unexpected. Contact the teacher another way before opening it."
      }
    }),

    S({
      id: "r-bank-alert-sms",
      mission: "recognize",
      title: "Frozen Account Text",
      type: "text",
      technique: "SMS credential phishing",
      persuasion: ["Fear", "Urgency", "Authority"],
      context: "The text arrives from an unknown number. The student has a debit card but did not receive an alert inside the bank app.",
      artifact: {
        kind: "text",
        app: "Messages",
        sender: "+1 (202) 555-0187",
        contactLabel: "Unknown Sender",
        time: "6:17 PM",
        message: "SECURITY ALERT: Your debit account is frozen. Confirm activity NOW to avoid permanent restriction.",
        link: { text: "short.example/7Qp2", url: "https://short.example/7Qp2" }
      },
      inspections: [
        I("sender", "Sender number", "phone", "The message came from an unrecognized ten-digit number, not a verified bank short code or saved contact.", ["unknown_number"]),
        I("link", "Expanded link", "link", "The shortened address expands to secure-bank-check.example/login, which is not the bank's registered domain.", ["hidden_destination"]),
        I("request", "Requested action", "shield", "The destination asks for an online-banking username, password, and one-time verification code.", ["credential_request"]),
        I("context", "Account cross-check", "history", "The bank app shows no frozen-account notice and the number on the back of the card is different.", ["trusted_source_conflict"])
      ],
      evidence: [
        E("unknown_number", "The alert came from an unrecognized number", "Unknown numbers are common in legitimate and malicious texts, so this is supporting evidence.", "moderate", "risk", "sender"),
        E("hidden_destination", "The shortened link hides an unrelated destination", "The expanded destination does not belong to the bank.", "strong", "risk", "link"),
        E("credential_request", "The page requests a password and one-time code", "Providing both could allow immediate account takeover.", "strong", "risk", "request"),
        E("trusted_source_conflict", "The official bank app shows no matching alert", "An independent trusted source contradicts the text.", "strong", "risk", "context")
      ],
      bestEvidence: ["hidden_destination", "credential_request", "trusted_source_conflict"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "The hidden destination is unrelated to the bank, requests credentials and a one-time code, and is contradicted by the official bank app.",
      distractors: [
        "Banks never send text messages, so any financial text is malicious.",
        "The sender used the words SECURITY ALERT, which are only used by scammers."
      ],
      hints: [
        "Expand the shortened destination without opening it.",
        "Compare the text with a source you already trust, such as the bank app or number on the card.",
        "Look for requests that would defeat multifactor authentication."
      ],
      misconceptionTags: ["All bank texts are malicious", "Capital letters as proof", "Short URL alone as proof"],
      competencies: ["social_engineering", "domain_analysis", "authentication", "data_protection"],
      nearTransferId: "p-mfa-fatigue",
      consequence: {
        ideal: "The text is reported as junk. The student checks the account through the bank app and uses the card's printed number if help is needed.",
        unsafe: "The attacker captures the password and one-time code, then signs in before the code expires."
      },
      debrief: {
        what: "SMS phishing that uses a fake account emergency to collect banking credentials and a one-time code.",
        strongest: "The unrelated destination, credential request, and contradiction from the official app are decisive.",
        inconclusive: "An unknown number and capital letters raise concern, but legitimate alerts can also use unfamiliar numbers or urgent wording.",
        next: "Report the text, open the bank app independently, or call the number printed on the card.",
        plain: "The text sends the student to the wrong website and asks for login codes. Report it and check the bank app directly."
      }
    }),

    S({
      id: "r-club-fundraiser",
      mission: "recognize",
      title: "Robotics Club QR Fundraiser",
      type: "qr",
      technique: "Legitimate QR-code campaign",
      persuasion: ["Community", "Familiarity"],
      context: "This poster is displayed on the school activities board during the robotics club's announced fundraiser week.",
      artifact: {
        kind: "qr",
        app: "Printed Poster",
        posterTitle: "Help Send Robotics to State!",
        copy: "Optional $5 snack-box fundraiser. Orders close Friday. No account login required.",
        organizer: "Lincoln High Robotics Club",
        footer: "Questions? robotics@lincoln-hs.example",
        encodedUrl: "https://clubs.lincoln-hs.example/robotics/fundraiser"
      },
      inspections: [
        I("qr", "QR destination preview", "qr", "The code resolves to clubs.lincoln-hs.example/robotics/fundraiser, a subdomain of the fictional school domain.", ["school_destination"]),
        I("organizer", "Organizer details", "identity", "The listed club email uses lincoln-hs.example and matches the address on the school's activities page.", ["verified_organizer"]),
        I("context", "School announcement", "history", "The weekly bulletin announces the same fundraiser, dates, and optional $5 item.", ["corroborated_event"]),
        I("request", "Requested information", "shield", "The page requests a quantity and school pickup name. It does not request a school password, Social Security number, or recovery code.", ["limited_data"])
      ],
      evidence: [
        E("school_destination", "The QR code stays on the school domain", "Previewing the destination reduces the risk of blindly opening a hidden site.", "strong", "safe", "qr"),
        E("verified_organizer", "The organizer matches the school activities page", "The identity is independently corroborated.", "strong", "safe", "organizer"),
        E("corroborated_event", "The event matches a separate school bulletin", "Independent context strongly supports legitimacy.", "strong", "safe", "context"),
        E("limited_data", "The form requests only information needed for pickup", "Data minimization supports legitimacy, though every form should still be reviewed.", "moderate", "safe", "request")
      ],
      bestEvidence: ["school_destination", "verified_organizer", "corroborated_event"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The QR destination, organizer identity, and event details all match independent school sources, and the form requests only limited pickup information.",
      distractors: [
        "QR codes posted at school are automatically safe because staff monitor the building.",
        "Any QR code is too risky to use because the destination is hidden until it is scanned."
      ],
      hints: [
        "Preview the destination instead of treating the QR code itself as good or bad.",
        "Look for an independent school announcement that matches the poster.",
        "Check whether the form asks for more data than the activity needs."
      ],
      misconceptionTags: ["All QR codes are malicious", "Physical location guarantees safety", "School branding equals proof"],
      competencies: ["identity_verification", "domain_analysis", "data_protection"],
      nearTransferId: "c-qr-scholarship",
      consequence: {
        ideal: "The student previews the code, confirms the event through the school bulletin, and can participate normally.",
        unsafe: "Automatically rejecting every QR code creates false positives and prevents use of a verified school activity."
      },
      debrief: {
        what: "A legitimate school fundraiser delivered through a QR code.",
        strongest: "The school-domain destination and independent confirmation from the activities page and bulletin support proceeding.",
        inconclusive: "A QR code, school colors, or a poster inside the building is not proof by itself because stickers and signs can be replaced.",
        next: "Preview the destination, verify the organizer, and provide only information the transaction actually requires.",
        plain: "The code goes to the real school site and the fundraiser is confirmed elsewhere. It is reasonable to use."
      }
    })
  );

  /* Mission 2: Verify Identity and Destination */
  scenarios.push(
    S({
      id: "v-chatguild-reward",
      mission: "verify",
      title: "Free Nitro Direct Message",
      type: "dm",
      technique: "Gaming reward phishing",
      persuasion: ["Reward", "Scarcity", "Social proof"],
      context: "A direct message arrives from an account that is not on the student's friends list after a busy gaming session.",
      artifact: {
        kind: "dm",
        app: "Community Chat",
        platform: "ChatGuild-style DM",
        profileName: "Nitro Rewards Team",
        handle: "@nitro_claims_2026",
        status: "New account · No mutual servers",
        time: "9:22 PM",
        message: "You were selected for 12 months of Nitro. 3 claims left. Sign in to connect your account and activate it now.",
        link: { text: "Claim reward", url: "https://chatguild-gift.example/authorize" }
      },
      inspections: [
        I("profile", "Profile details", "identity", "The account was created today, has no mutual servers, and is not marked as an official system account.", ["untrusted_profile"]),
        I("link", "Destination preview", "link", "The destination is chatguild-gift.example. The registered domain is not chatguild.example.", ["wrong_registered_domain"]),
        I("request", "Sign-in request", "shield", "The page requests a ChatGuild email, password, and backup code rather than using the platform's normal authorization screen.", ["credential_collection"]),
        I("language", "Persuasion tactics", "message", "The message combines an unexpected reward with a claim counter to create scarcity.", ["reward_scarcity"])
      ],
      evidence: [
        E("untrusted_profile", "The account is new and unconnected", "The claimed official identity is not supported by the platform profile.", "strong", "risk", "profile"),
        E("wrong_registered_domain", "The destination is not on chatguild.example", "A domain containing the brand name is not the same as the brand's registered domain.", "strong", "risk", "link"),
        E("credential_collection", "The page requests a password and backup code", "A legitimate authorization screen should not ask another site to collect these secrets.", "strong", "risk", "request"),
        E("reward_scarcity", "The reward is paired with a fake claim counter", "Scarcity is a manipulation tactic and supporting evidence.", "moderate", "risk", "language")
      ],
      bestEvidence: ["untrusted_profile", "wrong_registered_domain", "credential_collection"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "The unverified account directs the student to a non-ChatGuild domain that collects credentials and a backup code.",
      distractors: [
        "Free offers in gaming communities are always scams, even when posted by a verified organizer.",
        "The profile uses the word Nitro, so it is probably connected to the real service."
      ],
      hints: [
        "Inspect the profile rather than trusting the display name.",
        "Read the destination from right to left to find the registered domain.",
        "Ask whether an outside site should ever collect a platform password or backup code."
      ],
      misconceptionTags: ["Brand name inside a domain", "Display name equals identity", "Reward overrides verification"],
      competencies: ["identity_verification", "domain_analysis", "authentication", "social_engineering"],
      nearTransferId: "i-teacher-compromised-share",
      consequence: {
        ideal: "The student reports and blocks the account. The platform can remove the campaign before more users submit credentials.",
        unsafe: "The attacker signs in, changes recovery information, and sends the same reward message from the student's account."
      },
      debrief: {
        what: "A gaming reward lure that attempts to steal account credentials and recovery information.",
        strongest: "The unverified profile, unrelated registered domain, and direct collection of secrets are decisive.",
        inconclusive: "A reward or countdown creates pressure but is not proof without identity and destination evidence.",
        next: "Report and block the sender. Check promotions only inside the official app or an independently opened official site.",
        plain: "A fake account sends the student to the wrong website and asks for login secrets. Report it."
      }
    }),

    S({
      id: "v-streambeat-receipt",
      mission: "verify",
      title: "Expected Music Subscription Receipt",
      type: "email",
      technique: "Legitimate transaction notice",
      persuasion: ["Familiarity"],
      context: "Alex upgraded a music subscription earlier that afternoon and recognizes the plan and card ending shown in the receipt.",
      artifact: {
        kind: "email",
        app: "Personal Mail",
        fromName: "StreamBeat",
        fromAddress: "no-reply@streambeat.example",
        replyTo: "no-reply@streambeat.example",
        to: "alex.student@example.net",
        date: "4:12 PM",
        subject: "Your StreamBeat Premium receipt",
        body: [
          "Hi Alex,",
          "Thanks for your Premium subscription.",
          "Plan: Individual Premium · Amount: $11.99 · Card: Visa ending 4242",
          "Your next billing date is September 3, 2026. You can manage the plan from your account page.",
          "StreamBeat"
        ],
        link: { text: "Manage subscription", url: "https://streambeat.example/account" }
      },
      inspections: [
        I("sender", "Sender details", "identity", "The sender and reply address both use streambeat.example.", ["official_sender"]),
        I("context", "Transaction history", "history", "The amount, plan, time, and card ending match the subscription change Alex completed earlier.", ["matching_transaction"]),
        I("link", "Destination preview", "link", "The destination is streambeat.example/account. The registered domain is streambeat.example.", ["official_destination"]),
        I("request", "Requested information", "shield", "The email presents a receipt and account-management option; it does not request payment details or a password by reply.", ["no_secret_request"])
      ],
      evidence: [
        E("official_sender", "The sender uses the service's official domain", "The address is consistent with the claimed organization.", "strong", "safe", "sender"),
        E("matching_transaction", "The receipt matches a transaction the student initiated", "Independent account context strongly supports legitimacy.", "strong", "safe", "context"),
        E("official_destination", "The destination stays on streambeat.example", "The registered domain matches the service.", "strong", "safe", "link"),
        E("no_secret_request", "The message does not ask the student to send secrets", "This supports legitimacy but is not decisive on its own.", "moderate", "safe", "request")
      ],
      bestEvidence: ["official_sender", "matching_transaction", "official_destination"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The official sender and destination match a transaction the student just completed, and the receipt does not request additional sensitive information.",
      distractors: [
        "Receipts are always legitimate because attackers gain nothing from copying them.",
        "The message includes the last four card digits, so only the real company could have sent it."
      ],
      hints: [
        "Compare the receipt with a transaction the student independently remembers.",
        "Verify the registered domain of both the sender and destination.",
        "Do not treat a card ending as secret proof; focus on the full evidence set."
      ],
      misconceptionTags: ["Transaction detail proves identity", "All receipts are safe"],
      competencies: ["identity_verification", "domain_analysis"],
      nearTransferId: "i-travel-login-alert",
      consequence: {
        ideal: "The student can keep the receipt or manage the plan by opening the official app or website directly.",
        unsafe: "Over-reporting a verified receipt creates a false positive and may cause unnecessary account confusion."
      },
      debrief: {
        what: "A legitimate receipt that matches an expected subscription action.",
        strongest: "Official identity, official destination, and matching transaction context support proceeding.",
        inconclusive: "A name, logo, card ending, or professional layout can be copied and should not be used alone.",
        next: "Proceed normally, or open the official app directly to manage the subscription.",
        plain: "The receipt matches what Alex just bought and uses the real service website. It is reasonable to proceed."
      }
    }),

    S({
      id: "v-college-score",
      mission: "verify",
      title: "College Entrance Score Unlock Request",
      type: "email",
      technique: "Student identity phishing",
      persuasion: ["Authority", "Curiosity", "Urgency"],
      context: "College entrance scores are expected this week, but the student has not received any notice inside the College Testing Service account.",
      artifact: {
        kind: "email",
        app: "Personal Mail",
        fromName: "College Testing Service",
        fromAddress: "scores@college-results.example",
        replyTo: "identity@score-access.example",
        to: "alex.student@example.net",
        date: "7:08 AM",
        subject: "Your score report is ready — identity check required",
        body: [
          "Dear Student,",
          "Your score report has been released. Verify your full name, birth date, and last four Social Security digits to unlock it.",
          "Reports that are not verified today may be delayed.",
          "Score Services"
        ],
        link: { text: "Unlock score report", url: "https://college-results.example/scores" }
      },
      inspections: [
        I("sender", "Sender and reply details", "identity", "The sender uses college-results.example and the reply address uses score-access.example. The official organization uses college-testing.example.", ["lookalike_domain"]),
        I("link", "Destination preview", "link", "The destination remains on college-results.example rather than college-testing.example.", ["wrong_score_destination"]),
        I("request", "Identity request", "shield", "The page requests birth date and Social Security digits before displaying a score.", ["identity_data_request"]),
        I("context", "Official account check", "history", "The student's independently opened College Testing Service account has no matching verification notice.", ["official_account_conflict"])
      ],
      evidence: [
        E("lookalike_domain", "The sender uses a look-alike domain", "The claimed organization and registered domain do not match.", "strong", "risk", "sender"),
        E("wrong_score_destination", "The score link stays outside college-testing.example", "The destination cannot be verified as the official score portal.", "strong", "risk", "link"),
        E("identity_data_request", "The page requests sensitive identity information", "Social Security digits and birth date could be used for identity theft.", "strong", "risk", "request"),
        E("official_account_conflict", "The official account has no matching notice", "An independent trusted source contradicts the email.", "strong", "risk", "context")
      ],
      bestEvidence: ["lookalike_domain", "identity_data_request", "official_account_conflict"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "The message uses look-alike domains, requests identity data, and is contradicted by the student's independently opened official account.",
      distractors: [
        "Any score notification is malicious because testing organizations never use email.",
        "The email is probably legitimate because scores are expected this week."
      ],
      hints: [
        "Expected timing can make a lure more believable; verify the actual identity and domain.",
        "Compare the message with the student's account opened independently.",
        "Consider whether the requested data is necessary to view a score."
      ],
      misconceptionTags: ["Expected timing equals legitimacy", "Brand phrase inside domain", "Authority overrides data minimization"],
      competencies: ["identity_verification", "domain_analysis", "data_protection", "social_engineering"],
      nearTransferId: "r-scholarship-award",
      consequence: {
        ideal: "The message is reported. The student checks scores only through the official account opened independently.",
        unsafe: "The student exposes identity data that can be combined with information from other breaches."
      },
      debrief: {
        what: "A score-release lure that uses expected timing to steal identity information from students.",
        strongest: "The look-alike domain, sensitive-data request, and mismatch with the official account are decisive.",
        inconclusive: "The fact that scores are expected this week makes the message plausible, not trustworthy.",
        next: "Report the email and sign in by opening college-testing.example independently.",
        plain: "The email uses the wrong website and asks for private identity data. Report it and check scores on the real site."
      }
    }),

    S({
      id: "v-drive-share",
      mission: "verify",
      title: "Unexpected Lab Notes Share",
      type: "email",
      technique: "Ambiguous cloud-document share",
      persuasion: ["Familiarity", "Curiosity"],
      context: "A classmate's real school account shares a document called Lab Notes. The classmate is in the same science course, but no shared document was discussed.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "Jordan Lee via SchoolCloud Docs",
        fromAddress: "shares@schoolcloud.example",
        replyTo: "jlee@students.lincoln-hs.example",
        to: "alex@students.lincoln-hs.example",
        date: "5:33 PM",
        subject: "Jordan Lee shared “Lab Notes” with you",
        body: [
          "Jordan Lee invited you to edit the following document:",
          "Lab Notes",
          "Open the document to review comments."
        ],
        link: { text: "Open", url: "https://docs.schoolcloud.example/document/example-lab" }
      },
      inspections: [
        I("sender", "Notification sender", "identity", "The automated notification uses schoolcloud.example, and the reply contact is the classmate's normal school address.", ["valid_share_infrastructure"]),
        I("link", "Destination preview", "link", "The destination is docs.schoolcloud.example. The registered domain is schoolcloud.example.", ["valid_cloud_destination"]),
        I("history", "Class context", "history", "Jordan is in the class, but the assignment is individual and no document share was announced.", ["unexpected_share"]),
        I("permissions", "Document permissions", "key", "The invitation grants edit access. The content and owner intent cannot be confirmed until Jordan is contacted independently.", ["unconfirmed_owner_intent"])
      ],
      evidence: [
        E("valid_share_infrastructure", "The automated sender and reply contact are plausible", "This supports legitimacy but does not prove that the classmate intended the share.", "strong", "safe", "sender"),
        E("valid_cloud_destination", "The destination uses the legitimate cloud service", "A real platform reduces domain risk but can still distribute malicious or unwanted content.", "moderate", "safe", "link"),
        E("unexpected_share", "The share does not match the known assignment workflow", "Unexpected context creates unresolved uncertainty.", "strong", "risk", "history"),
        E("unconfirmed_owner_intent", "The owner's intent has not been independently confirmed", "A compromised account or accidental share remains possible.", "strong", "neutral", "permissions")
      ],
      bestEvidence: ["valid_share_infrastructure", "unexpected_share", "unconfirmed_owner_intent"],
      correctAssessment: "uncertain",
      correctAction: "verify",
      rationale: "The notification and platform are legitimate, but the unexpected share and unconfirmed owner intent require a trusted-channel check with the classmate.",
      distractors: [
        "SchoolCloud Docs links are safe because the platform scans all content before it is shared.",
        "Unexpected documents should always be reported as malicious without contacting the sender."
      ],
      hints: [
        "A real cloud platform can carry legitimate, accidental, or malicious content.",
        "Separate platform authenticity from the sender's intent.",
        "Identify a trusted channel for contacting Jordan that does not depend on the document."
      ],
      misconceptionTags: ["Legitimate platform equals safe", "Unexpected equals malicious", "Official notification proves owner intent"],
      competencies: ["identity_verification", "evidence_analysis"],
      nearTransferId: "r-teacher-grade-share",
      consequence: {
        ideal: "Alex messages Jordan through the school directory or speaks in class. Jordan confirms whether the share was intentional.",
        unsafe: "Alex assumes the real platform proves the request and follows any later prompts without confirming the sender's intent."
      },
      debrief: {
        what: "A legitimate platform notification with unresolved uncertainty about whether the account owner intended the share.",
        strongest: "The real infrastructure is reassuring, but the unexpected context and unconfirmed owner intent require verification.",
        inconclusive: "A SchoolCloud domain does not establish that every file or account using the service is trustworthy.",
        next: "Contact the classmate through a known school channel before opening or editing the document.",
        plain: "The SchoolCloud message may be real, but Alex did not expect the file. Ask Jordan another way before opening it."
      }
    }),

    S({
      id: "v-oauth-study-app",
      mission: "verify",
      title: "Flashcard App Wants Full Mail Access",
      type: "oauth",
      technique: "OAuth consent phishing",
      persuasion: ["Convenience", "Authority"],
      context: "A study website says connecting a school account will automatically create flashcards from class emails.",
      artifact: {
        kind: "oauth",
        app: "Account Authorization",
        service: "School Account",
        appName: "Study Sync Pro",
        publisher: "Publisher not verified",
        account: "alex@students.lincoln-hs.example",
        permissions: [
          "Read all of your email",
          "Send email as you",
          "Read and edit your contacts",
          "Maintain access after you close the app"
        ],
        redirectHost: "study-sync-access.example"
      },
      inspections: [
        I("publisher", "Publisher identity", "identity", "The publisher is not verified and the support address uses study-sync-access.example, a domain unrelated to the school.", ["unverified_publisher"]),
        I("permissions", "Permission scope", "key", "The app requests the ability to read all mail, send mail, edit contacts, and keep long-term access.", ["excessive_permissions"]),
        I("purpose", "Purpose comparison", "scale", "Creating flashcards does not require sending email as the student or editing every contact.", ["purpose_mismatch"]),
        I("policy", "School app policy", "policy", "The school requires connected apps to appear in the approved-app catalog. Study Sync Pro is not listed.", ["unapproved_app"])
      ],
      evidence: [
        E("unverified_publisher", "The app publisher is unverified", "The requester cannot be confidently connected to a trusted organization.", "strong", "risk", "publisher"),
        E("excessive_permissions", "The app requests broad, persistent access", "These permissions could support account surveillance and impersonation.", "strong", "risk", "permissions"),
        E("purpose_mismatch", "The permissions exceed the stated flashcard purpose", "Least privilege is violated because the app asks for capabilities it does not need.", "strong", "risk", "purpose"),
        E("unapproved_app", "The app is absent from the approved catalog", "The request conflicts with an independent organizational control.", "strong", "risk", "policy")
      ],
      bestEvidence: ["excessive_permissions", "purpose_mismatch", "unapproved_app"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "An unverified, unapproved app requests persistent email and contact permissions far beyond its stated flashcard purpose.",
      distractors: [
        "Any app that requests more than one permission is malicious.",
        "The request is safe because the authorization screen belongs to the school account provider."
      ],
      hints: [
        "Compare each requested permission with what a flashcard app actually needs.",
        "A legitimate authorization screen can still present a dangerous third-party request.",
        "Check the school's approved-app policy."
      ],
      misconceptionTags: ["Legitimate authorization screen equals safe app", "More than one permission equals malicious", "Convenience overrides least privilege"],
      competencies: ["identity_verification", "authentication", "data_protection", "defensive_controls"],
      nearTransferId: "c-oauth-token-abuse",
      consequence: {
        ideal: "The student denies and reports the request. IT reviews the app and warns others before access is granted.",
        unsafe: "The app receives persistent access and can read messages, send convincing phishing from the student's account, and collect contacts."
      },
      debrief: {
        what: "OAuth consent phishing or an unsafe overprivileged app seeking access without collecting the password directly.",
        strongest: "The purpose-permission mismatch and violation of the approved-app policy are decisive.",
        inconclusive: "The account provider's real authorization page proves the screen is real, not that the requesting app is trustworthy.",
        next: "Deny and report the app. Use only approved tools and review existing connected-app access regularly.",
        plain: "The study app asks for much more account access than it needs. Deny and report it."
      }
    }),

    S({
      id: "v-calendar-interview",
      mission: "verify",
      title: "Expected Internship Interview Invite",
      type: "calendar",
      technique: "Legitimate calendar invitation",
      persuasion: ["Opportunity"],
      context: "Alex applied to Northstar Labs through the company's careers page and spoke with the recruiter yesterday about a Tuesday interview.",
      artifact: {
        kind: "calendar",
        app: "Calendar",
        event: "Northstar Labs Student Internship Interview",
        organizer: "Maya Chen <maya.chen@northstar-labs.example>",
        date: "Tuesday, August 11",
        time: "2:00–2:30 PM Pacific",
        location: "Classroom Video",
        notes: "Conversation with Maya Chen and Devon Brooks. Bring questions; no documents or payment required.",
        link: { text: "Join meeting", url: "https://meet.schoolcloud.example/abc-defg-hij" }
      },
      inspections: [
        I("organizer", "Organizer identity", "identity", "The organizer uses northstar-labs.example, the same domain shown on the independently opened careers page and previous recruiter email.", ["matching_recruiter"]),
        I("context", "Application timeline", "history", "The date, time, role, and recruiter match the conversation Alex had yesterday.", ["expected_interview"]),
        I("link", "Meeting destination", "link", "The meeting uses meet.schoolcloud.example and does not redirect through another site.", ["known_meeting_service"]),
        I("request", "Requested information", "shield", "The invitation does not request money, identity documents, passwords, software installation, or account recovery data.", ["normal_interview_scope"])
      ],
      evidence: [
        E("matching_recruiter", "The organizer matches the verified company contact", "The identity is consistent with an independently opened careers page and prior exchange.", "strong", "safe", "organizer"),
        E("expected_interview", "The invitation matches a scheduled conversation", "The context is expected and specific.", "strong", "safe", "context"),
        E("known_meeting_service", "The meeting link stays on a known service domain", "The destination is consistent with the invitation.", "strong", "safe", "link"),
        E("normal_interview_scope", "The request fits a normal interview", "The invitation asks only for attendance and questions.", "moderate", "safe", "request")
      ],
      bestEvidence: ["matching_recruiter", "expected_interview", "known_meeting_service"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The organizer, timing, role, and meeting destination all match an interview Alex independently arranged with the verified company contact.",
      distractors: [
        "Calendar invitations are safer than email because attackers cannot send them without permission.",
        "The opportunity is legitimate because no payment is requested in the first message."
      ],
      hints: [
        "Compare the invitation with the application and prior conversation.",
        "Verify the organizer's domain and the meeting destination separately.",
        "Look for requests that fall outside a normal interview process."
      ],
      misconceptionTags: ["Calendar invites cannot be malicious", "No immediate payment equals safe"],
      competencies: ["identity_verification", "domain_analysis"],
      nearTransferId: "r-codeforge-welcome",
      consequence: {
        ideal: "Alex accepts the verified invitation and attends the interview without sharing unnecessary information.",
        unsafe: "Unnecessary reporting causes confusion and could delay a legitimate opportunity."
      },
      debrief: {
        what: "A legitimate calendar invitation tied to an independently verified internship application and recruiter conversation.",
        strongest: "The verified organizer, expected timing, and known meeting destination support proceeding.",
        inconclusive: "A calendar format or absence of an immediate payment request is not proof by itself.",
        next: "Proceed normally and remain alert if later requests fall outside the verified interview process.",
        plain: "The invite matches the interview Alex arranged with a verified recruiter. It is reasonable to accept."
      }
    })
  );

  /* Mission 3: Protect Accounts and Data */
  scenarios.push(
    S({
      id: "p-mfa-fatigue",
      mission: "protect",
      title: "Repeated Sign-In Approval Prompts",
      type: "login",
      technique: "MFA fatigue and account takeover",
      persuasion: ["Annoyance", "Urgency", "Authority"],
      context: "A student receives seven approval prompts while studying. They are not signing in and have never used the device or location shown.",
      artifact: {
        kind: "login",
        app: "Authenticator",
        service: "Lincoln High Account",
        heading: "Approve sign-in?",
        summary: "Someone is trying to sign in to alex@students.lincoln-hs.example",
        events: [
          { time: "8:11 PM", source: "Windows 11 · Chrome", detail: "Ashburn, Virginia", status: "Pending" },
          { time: "8:09 PM", source: "Windows 11 · Chrome", detail: "Ashburn, Virginia", status: "Denied" },
          { time: "8:07 PM", source: "Windows 11 · Chrome", detail: "Ashburn, Virginia", status: "Denied" },
          { time: "8:03 PM", source: "Windows 11 · Chrome", detail: "Ashburn, Virginia", status: "Denied" }
        ]
      },
      inspections: [
        I("activity", "Prompt pattern", "activity", "Seven prompts arrived in twelve minutes even though Alex did not start a sign-in.", ["unsolicited_prompts"]),
        I("device", "Device details", "device", "The sign-in uses Windows 11 and Chrome. Alex is currently using a school Chromebook.", ["unknown_device"]),
        I("location", "Location details", "map", "The prompts originate in Ashburn, Virginia. Alex is at home in Washington state.", ["unfamiliar_location"]),
        I("policy", "MFA guidance", "policy", "The school's guidance says to deny unexpected prompts, report them, change the password, and review active sessions.", ["known_response"])
      ],
      evidence: [
        E("unsolicited_prompts", "The student did not initiate a sign-in", "Unexpected repeated prompts indicate that someone may already know the password.", "strong", "risk", "activity"),
        E("unknown_device", "The device does not match the student's device", "The requested session comes from a different platform.", "strong", "risk", "device"),
        E("unfamiliar_location", "The sign-in location is inconsistent", "Location data is approximate, but the distance adds strong supporting evidence.", "moderate", "risk", "location"),
        E("known_response", "School guidance defines a containment process", "The independent policy identifies the correct defensive response.", "strong", "safe", "policy")
      ],
      bestEvidence: ["unsolicited_prompts", "unknown_device", "known_response"],
      correctAssessment: "malicious",
      correctAction: "escalate",
      rationale: "Repeated unrequested prompts from an unknown device indicate an active sign-in attempt, so the student should deny access and escalate for containment.",
      distractors: [
        "The location is far away, so location alone proves that an attacker has the password.",
        "Approving one prompt will stop the notifications and let the student change the password afterward."
      ],
      hints: [
        "The most important question is whether the student initiated the sign-in.",
        "Compare the requested device with the device the student is actually using.",
        "Look up the organization's response process before approving anything."
      ],
      misconceptionTags: ["Approve to stop prompts", "Location alone as proof", "MFA prevents all account attacks"],
      competencies: ["authentication", "incident_response", "defensive_controls"],
      nearTransferId: "i-forwarding-rule",
      response: {
        prompt: "Choose the first four response steps in the safest order.",
        maxSteps: 4,
        steps: [
          { id: "deny", label: "Deny the pending prompt", why: "Prevents the current approval request from completing." },
          { id: "report", label: "Report the activity to school IT", why: "Allows the organization to investigate and protect related accounts." },
          { id: "password", label: "Change the password from the known school portal", why: "Invalidates the password the attacker may already possess." },
          { id: "sessions", label: "Review and revoke unfamiliar sessions", why: "Removes access that may already have been established." },
          { id: "approve", label: "Approve one prompt to make the alerts stop", why: "This could grant the attacker access." },
          { id: "ignore", label: "Mute notifications and continue studying", why: "The active attack would continue without containment." }
        ],
        correctOrder: ["deny", "report", "password", "sessions"],
        success: "The active request is denied, IT is notified, the exposed credential is replaced, and existing sessions are reviewed.",
        failure: "Approving or ignoring the prompts can allow account access or leave the attack active."
      },
      consequence: {
        ideal: "The student denies the request and follows the response sequence before access is granted.",
        unsafe: "A fatigued student approves a prompt. The attacker signs in and creates a forwarding rule."
      },
      debrief: {
        what: "MFA fatigue: an attacker repeatedly sends approval prompts after obtaining or guessing the account password.",
        strongest: "The unrequested prompts and unknown device are direct indicators; the school policy supplies the response sequence.",
        inconclusive: "Location can be approximate or affected by network routing, so it should not be the only basis for a decision.",
        next: "Deny, report, change the password through the known portal, revoke unfamiliar sessions, and confirm MFA settings.",
        plain: "Someone else is trying to sign in and wants Alex to approve it. Deny, report, change the password, and check sessions."
      }
    }),

    S({
      id: "p-password-reset",
      mission: "protect",
      title: "Student-Initiated Password Reset",
      type: "email",
      technique: "Legitimate account recovery",
      persuasion: ["Expected action"],
      context: "Alex selected “Forgot password” from the independently opened school portal less than one minute before this email arrived.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "Lincoln High Accounts",
        fromAddress: "accounts@lincoln-hs.example",
        replyTo: "no-reply@lincoln-hs.example",
        to: "alex@students.lincoln-hs.example",
        date: "11:18 AM",
        subject: "Reset your Lincoln High password",
        body: [
          "Hi Alex,",
          "We received a password-reset request for your school account. The single-use link expires in 20 minutes.",
          "If you did not request this, do not use the link and contact school IT from the directory.",
          "Lincoln High Accounts"
        ],
        link: { text: "Reset password", url: "https://accounts.lincoln-hs.example/reset/example-token" }
      },
      inspections: [
        I("sender", "Sender details", "identity", "The sender and reply address use the school's lincoln-hs.example domain.", ["school_sender"]),
        I("context", "Recent account activity", "history", "A reset was requested from the known school portal less than one minute earlier.", ["user_initiated"]),
        I("link", "Destination preview", "link", "The destination is accounts.lincoln-hs.example, a subdomain of the school's registered domain.", ["school_reset_destination"]),
        I("request", "Security design", "shield", "The email provides a single-use reset link and does not ask for the existing password by email or reply.", ["appropriate_recovery_flow"])
      ],
      evidence: [
        E("school_sender", "The sender uses the expected school domain", "The claimed organization and sender domain are consistent.", "strong", "safe", "sender"),
        E("user_initiated", "The student just requested the reset", "Expected timing is strong independent context.", "strong", "safe", "context"),
        E("school_reset_destination", "The link remains on the school domain", "The registered domain matches the account provider.", "strong", "safe", "link"),
        E("appropriate_recovery_flow", "The recovery process uses a single-use link", "The flow does not ask the student to reveal the old password to the sender.", "strong", "safe", "request")
      ],
      bestEvidence: ["user_initiated", "school_reset_destination", "appropriate_recovery_flow"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The student initiated the reset, the sender and destination use the school domain, and the recovery flow follows an appropriate single-use process.",
      distractors: [
        "Password-reset emails are always dangerous because they contain account links.",
        "The twenty-minute expiration proves the message is phishing because it creates urgency."
      ],
      hints: [
        "Compare the email with the action the student just completed.",
        "Check the registered domain of the reset destination.",
        "Distinguish a security expiration from manipulative urgency by using the full evidence set."
      ],
      misconceptionTags: ["All account links are malicious", "Any deadline equals phishing"],
      competencies: ["authentication", "identity_verification", "domain_analysis"],
      nearTransferId: "r-school-it-reset",
      consequence: {
        ideal: "Alex uses the single-use link or returns to the known portal and creates a unique password.",
        unsafe: "Treating every reset as malicious can prevent legitimate recovery and encourage insecure workarounds."
      },
      debrief: {
        what: "A legitimate account-recovery message triggered by the student's own action.",
        strongest: "The student-initiated request, school-domain destination, and appropriate recovery design support proceeding.",
        inconclusive: "A short expiration is common for real recovery tokens and is not automatically a manipulation tactic.",
        next: "Proceed through the verified portal and create a unique password; contact IT if the reset was not requested.",
        plain: "Alex asked for this reset, and the link stays on the real school site. It is reasonable to continue."
      }
    }),

    S({
      id: "p-browser-update",
      mission: "protect",
      title: "Video Player Update Page",
      type: "web",
      technique: "Malicious software download",
      persuasion: ["Urgency", "Convenience", "Authority"],
      context: "A streaming site opens a new tab saying the browser is out of date. The browser's own update menu shows no available update.",
      artifact: {
        kind: "web",
        app: "Web Browser",
        pageTitle: "Critical Browser Update",
        address: "https://video-codec-update.example/chrome",
        heading: "Your browser cannot play this video",
        body: "Install the verified HD codec and security update to continue. The download starts immediately.",
        fields: [],
        button: "Download Chrome_Update.js",
        brand: "C"
      },
      inspections: [
        I("address", "Address analysis", "link", "The page is hosted on video-codec-update.example, not the browser vendor's domain.", ["unrelated_update_domain"]),
        I("download", "Download details", "file", "The offered file is Chrome_Update.js, a JavaScript file. Browser updates are delivered through the browser or operating system, not a random media site.", ["dangerous_file_type"]),
        I("browser", "Browser update status", "history", "The browser's independently opened update page reports that it is current.", ["trusted_update_conflict"]),
        I("language", "Message language", "message", "The page blocks the video and frames the download as both a security requirement and an immediate fix.", ["forced_download"])
      ],
      evidence: [
        E("unrelated_update_domain", "The update is hosted on an unrelated domain", "The site cannot be verified as the browser vendor.", "strong", "risk", "address"),
        E("dangerous_file_type", "The page offers a script file as a browser update", "A .js download from a media site can execute malicious instructions.", "strong", "risk", "download"),
        E("trusted_update_conflict", "The browser's own update screen says it is current", "An independent trusted source contradicts the page.", "strong", "risk", "browser"),
        E("forced_download", "Content is blocked until software is installed", "This is a manipulation pattern, but supporting rather than decisive evidence.", "moderate", "risk", "language")
      ],
      bestEvidence: ["unrelated_update_domain", "dangerous_file_type", "trusted_update_conflict"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "An unrelated website offers a script as a browser update even though the browser's trusted update screen says no update is needed.",
      distractors: [
        "Any website that asks for an update is malicious, including official vendor update pages.",
        "The download is safe because the filename includes Chrome and Security."
      ],
      hints: [
        "Check where trusted browser updates normally come from.",
        "Inspect the complete filename and extension.",
        "Compare the page with the browser's own update status."
      ],
      misconceptionTags: ["Filename equals file identity", "All update notices are malicious", "Website controls browser update"],
      competencies: ["domain_analysis", "defensive_controls", "data_protection"],
      nearTransferId: "i-invoice-attachment",
      consequence: {
        ideal: "The student closes and reports the page without downloading the file, then uses the browser's own update function.",
        unsafe: "The script runs and installs credential-stealing software under the student's account."
      },
      debrief: {
        what: "A fake update page designed to deliver a malicious script.",
        strongest: "The unrelated domain, executable script type, and contradiction from the browser's own update screen are decisive.",
        inconclusive: "Security wording, a familiar logo, and a convincing filename can all be copied.",
        next: "Close and report the page. Update software only through the application, operating system, or verified vendor site.",
        plain: "The site is not the browser company and offers a dangerous script. Close and report it."
      }
    }),

    S({
      id: "p-photo-app-permissions",
      mission: "protect",
      title: "Photo Editor Permission Request",
      type: "oauth",
      technique: "Overbroad mobile-app permissions",
      persuasion: ["Convenience", "Familiarity"],
      context: "A popular photo editor was installed from the official app store. On first launch, it requests contacts, precise location, microphone, and all files.",
      artifact: {
        kind: "oauth",
        app: "Mobile Permissions",
        service: "Phone Privacy",
        appName: "BrightPic Editor",
        publisher: "Verified app-store publisher",
        account: "Local device permissions",
        permissions: [
          "Access all photos and files",
          "Read your contacts",
          "Use precise location at all times",
          "Use the microphone in the background"
        ],
        redirectHost: "Installed from official app store"
      },
      inspections: [
        I("publisher", "Publisher and source", "identity", "The app is from a verified store listing with a long history and matching publisher website.", ["verified_store_source"]),
        I("permissions", "Permission scope", "key", "Several permissions are unrelated to basic photo editing, especially contacts, continuous location, and background microphone access.", ["overbroad_permissions"]),
        I("purpose", "Feature comparison", "scale", "Editing selected photos requires access to chosen images. The other requested permissions are not needed for the stated core feature.", ["least_privilege_mismatch"]),
        I("settings", "Permission controls", "settings", "The operating system allows selected-photo access and lets the user deny or later change each additional permission.", ["safer_permission_option"])
      ],
      evidence: [
        E("verified_store_source", "The publisher and store listing are verifiable", "This supports legitimacy but does not justify every permission request.", "strong", "safe", "publisher"),
        E("overbroad_permissions", "The app requests unrelated sensitive permissions", "The scope creates privacy and security risk even if the app itself is not proven malicious.", "strong", "risk", "permissions"),
        E("least_privilege_mismatch", "The permissions exceed the editing purpose", "Least privilege suggests granting only access necessary for the selected task.", "strong", "risk", "purpose"),
        E("safer_permission_option", "The device provides a limited-access alternative", "The student can reduce risk without deciding that the entire app is malicious.", "strong", "safe", "settings")
      ],
      bestEvidence: ["verified_store_source", "least_privilege_mismatch", "safer_permission_option"],
      correctAssessment: "uncertain",
      correctAction: "verify",
      rationale: "The verified app may be legitimate, but its permissions exceed the photo-editing purpose; the student should deny unnecessary access and verify why it is requested.",
      distractors: [
        "An official app-store listing means every permission request is safe.",
        "Any app that asks for location or contacts is definitely malware and should be reported as an attack."
      ],
      hints: [
        "Separate the question 'Is this real software?' from 'Does it need this access?'",
        "Apply least privilege: grant only what the current feature needs.",
        "Look for a limited-permission option in the operating system."
      ],
      misconceptionTags: ["Official store equals safe permissions", "Overbroad permissions prove malware", "All-or-nothing access"],
      competencies: ["data_protection", "defensive_controls"],
      nearTransferId: "v-oauth-study-app",
      consequence: {
        ideal: "The student chooses selected-photo access, denies unrelated permissions, and reviews the app's privacy explanation before enabling anything else.",
        unsafe: "The app receives continuous access to data and sensors that are unnecessary for the student's purpose."
      },
      debrief: {
        what: "A legitimate-looking app with an overbroad permission request that should be reduced and verified.",
        strongest: "The verified source is reassuring, while the purpose-permission mismatch and limited-access option support a cautious, least-privilege response.",
        inconclusive: "An official store does not guarantee good privacy design, and an excessive request does not automatically prove malware.",
        next: "Deny unnecessary permissions, use limited access, and review the feature or privacy explanation before changing settings.",
        plain: "The app may be real, but it asks for more access than photo editing needs. Give it only limited photo access."
      }
    }),

    S({
      id: "p-backup-code-request",
      mission: "protect",
      title: "Help Desk Requests a Backup Code",
      type: "chat",
      technique: "Support impersonation and MFA bypass",
      persuasion: ["Authority", "Urgency", "Helpfulness"],
      context: "A pop-up chat appears after the student searches for account help. The student did not open chat from the school support portal.",
      artifact: {
        kind: "chat",
        app: "Support Chat",
        header: "Lincoln Account Assistance",
        agentName: "Support Agent 47",
        transcript: [
          { who: "agent", text: "I can see your account is in a security hold. I can clear it before class." },
          { who: "user", text: "What do I need to do?" },
          { who: "agent", text: "Send one unused MFA backup code. This verifies you own the account without needing your password." },
          { who: "agent", text: "Please respond within five minutes or the case will close." }
        ]
      },
      inspections: [
        I("source", "Chat source", "link", "The pop-up was loaded from account-help-live.example after a web search, not from support.lincoln-hs.example.", ["untrusted_support_source"]),
        I("agent", "Agent identity", "identity", "The agent provides only a number and cannot be matched to the school directory or an existing support ticket.", ["unverified_agent"]),
        I("request", "Requested secret", "shield", "An unused backup code can bypass normal multifactor authentication and should be protected like a password.", ["backup_code_secret"]),
        I("policy", "Support policy", "policy", "School IT states that staff never ask users to provide passwords, one-time codes, or backup codes.", ["support_policy_conflict"])
      ],
      evidence: [
        E("untrusted_support_source", "The chat is outside the school support domain", "The support channel was reached through a search result rather than the known portal.", "strong", "risk", "source"),
        E("unverified_agent", "The agent cannot be verified", "A generic agent number and missing ticket do not establish identity.", "moderate", "risk", "agent"),
        E("backup_code_secret", "The agent requests an MFA backup code", "A backup code can directly authorize account access.", "strong", "risk", "request"),
        E("support_policy_conflict", "The request violates the school's support policy", "An independent policy says staff will never ask for this secret.", "strong", "risk", "policy")
      ],
      bestEvidence: ["untrusted_support_source", "backup_code_secret", "support_policy_conflict"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "An unverified off-domain agent requests an MFA backup code in direct conflict with the school's support policy.",
      distractors: [
        "Support agents are never allowed to ask users any questions about an account.",
        "The request is safe because backup codes are different from passwords."
      ],
      hints: [
        "Treat backup codes as account secrets, not ordinary support information.",
        "Check how the chat was reached and whether it is on the known support domain.",
        "Compare the request with the school's published support policy."
      ],
      misconceptionTags: ["Backup codes are not passwords", "Search result equals official support", "Helpful tone equals safe"],
      competencies: ["authentication", "identity_verification", "data_protection", "social_engineering"],
      nearTransferId: "r-bank-alert-sms",
      response: {
        prompt: "Choose the first three protective steps.",
        maxSteps: 3,
        steps: [
          { id: "close", label: "Close the untrusted chat without sharing a code", why: "Stops the immediate social-engineering exchange." },
          { id: "portal", label: "Open the school support portal independently", why: "Moves the student to a known trusted channel." },
          { id: "report", label: "Report the impersonation and search result", why: "Helps the school and search provider protect other users." },
          { id: "code", label: "Send one backup code, then change it later", why: "A single code can be enough for account access." },
          { id: "screenshot_only", label: "Post a screenshot publicly to warn classmates", why: "This may expose private account details and bypass the reporting process." }
        ],
        correctOrder: ["close", "portal", "report"],
        success: "The student ends the unsafe exchange, moves to a known support channel, and reports the impersonation.",
        failure: "Sharing a code can authorize the attacker; public posting can spread sensitive details."
      },
      consequence: {
        ideal: "No code is shared. The student reaches school IT through the known portal and reports the fake support page.",
        unsafe: "The attacker uses the backup code to bypass MFA and enroll a new device."
      },
      debrief: {
        what: "Support impersonation designed to bypass MFA by collecting a backup code.",
        strongest: "The off-domain support channel, request for an authentication secret, and policy conflict are decisive.",
        inconclusive: "A helpful tone, fast response, or apparent knowledge of the student's problem does not establish identity.",
        next: "Close the chat, contact support through the known portal, and report the impersonation.",
        plain: "The fake support agent asks for a code that can unlock the account. Do not share it; use the real school support site."
      }
    }),

    S({
      id: "p-campus-wifi",
      mission: "protect",
      title: "Verified School Guest Wi-Fi",
      type: "web",
      technique: "Legitimate captive portal",
      persuasion: ["Convenience"],
      context: "The school library sign lists the network as Lincoln-Guest and says guests will be redirected to a terms page without entering a school password.",
      artifact: {
        kind: "web",
        app: "Wi-Fi Portal",
        pageTitle: "Lincoln High Guest Network",
        address: "https://guest.lincoln-hs.example/terms",
        heading: "Connect to Lincoln-Guest",
        body: "Review the acceptable-use policy. Guest access does not require a school account. This session expires after eight hours.",
        fields: ["Optional email for receipt"],
        button: "Accept and connect",
        brand: "L"
      },
      inspections: [
        I("network", "Network name", "wifi", "The connected network is Lincoln-Guest, exactly matching the name printed on the library sign.", ["matching_ssid"]),
        I("address", "Portal address", "link", "The page uses guest.lincoln-hs.example and the browser reports a valid connection for that fictional school domain.", ["school_guest_domain"]),
        I("request", "Information requested", "shield", "The portal requires only acceptance of terms. The email receipt field is optional, and no school password is requested.", ["minimal_guest_data"]),
        I("policy", "Posted instructions", "policy", "The physical sign and school website describe this exact no-password guest workflow.", ["corroborated_wifi_process"])
      ],
      evidence: [
        E("matching_ssid", "The network name matches the posted official name", "This reduces the risk of a simple look-alike network.", "strong", "safe", "network"),
        E("school_guest_domain", "The portal uses the school guest subdomain", "The destination matches the organization providing the network.", "strong", "safe", "address"),
        E("minimal_guest_data", "The portal does not request school credentials", "The data request matches the limited purpose of guest access.", "strong", "safe", "request"),
        E("corroborated_wifi_process", "Independent instructions match the workflow", "The sign and school site provide separate confirmation.", "strong", "safe", "policy")
      ],
      bestEvidence: ["school_guest_domain", "minimal_guest_data", "corroborated_wifi_process"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The network, school-domain portal, minimal data request, and independently posted instructions all match the official guest-access process.",
      distractors: [
        "Any captive portal is malicious because secure Wi-Fi never redirects a browser.",
        "A network inside a school building is automatically safe even when the name and portal do not match."
      ],
      hints: [
        "Compare the network name and portal with independently posted instructions.",
        "Check whether the portal requests school credentials or only the data needed for guest access.",
        "Verify the registered domain in the browser address bar."
      ],
      misconceptionTags: ["All captive portals are malicious", "Physical location guarantees network identity"],
      competencies: ["domain_analysis", "data_protection", "defensive_controls"],
      nearTransferId: "p-browser-update",
      consequence: {
        ideal: "The student accepts the verified guest terms and avoids transmitting sensitive data on a shared network.",
        unsafe: "Rejecting every verified captive portal prevents normal use, while blindly trusting any nearby network would create future risk."
      },
      debrief: {
        what: "A legitimate guest-network captive portal that follows the school's independently posted process.",
        strongest: "The school-domain portal, no-password workflow, and independent instructions support proceeding.",
        inconclusive: "Being physically inside the school or seeing a familiar network name is not sufficient without destination and process checks.",
        next: "Proceed with normal caution and avoid sensitive activity on shared networks unless additional protections are used.",
        plain: "The network and website match the school's posted instructions and do not ask for a school password. It is reasonable to connect."
      }
    })
  );

  /* Mission 4: Investigate the Incident */
  scenarios.push(
    S({
      id: "i-compromised-school-account",
      mission: "investigate",
      title: "From Shared Document to Account Takeover",
      type: "login",
      technique: "Credential theft followed by account abuse",
      persuasion: ["Familiarity", "Authority"],
      context: "Alex entered a school password after opening an unexpected document share. Ten minutes later, the account-activity screen shows these events.",
      artifact: {
        kind: "login",
        app: "Account Activity",
        service: "Lincoln High Account",
        heading: "Recent security activity",
        summary: "Review sign-ins, connected applications, and account changes.",
        events: [
          { time: "3:14 PM", source: "Chrome · Chromebook", detail: "Vancouver, WA", status: "Successful sign-in" },
          { time: "3:19 PM", source: "Chrome · Windows", detail: "Ashburn, VA", status: "Successful sign-in" },
          { time: "3:21 PM", source: "Mail settings", detail: "Forward all mail to archive-box@example.net", status: "Rule created" },
          { time: "3:23 PM", source: "Connected app", detail: "QuickDocs Sync", status: "Mail access granted" },
          { time: "3:26 PM", source: "Sent mail", detail: "18 messages to classmates", status: "Completed" }
        ]
      },
      inspections: [
        I("timeline", "Timeline comparison", "activity", "The unfamiliar sign-in occurs five minutes after the student's normal sign-in and before every account change.", ["suspicious_timeline"]),
        I("location", "Sign-in source", "map", "The Windows sign-in from Virginia does not match the student's Chromebook session in Washington.", ["impossible_session"]),
        I("mail", "Mail settings", "mail", "A new forwarding rule sends copies of all incoming mail to an external address the student does not recognize.", ["unauthorized_forwarding"]),
        I("apps", "Connected applications", "key", "QuickDocs Sync was granted mail access during the same incident window and is not an approved school app.", ["unauthorized_oauth"]),
        I("sent", "Sent-message activity", "send", "Eighteen classmates received a document-share message that Alex did not send.", ["account_abuse"])
      ],
      evidence: [
        E("suspicious_timeline", "The events form a coherent attack timeline", "The unknown sign-in precedes unauthorized changes and outbound messages.", "strong", "risk", "timeline"),
        E("impossible_session", "A simultaneous unfamiliar session appears", "The device and location do not match the student's activity.", "strong", "risk", "location"),
        E("unauthorized_forwarding", "An external forwarding rule was created", "Forwarding can expose password resets and other private mail after the initial compromise.", "strong", "risk", "mail"),
        E("unauthorized_oauth", "An unapproved app received mail access", "Persistent token access may survive a password change unless revoked.", "strong", "risk", "apps"),
        E("account_abuse", "The account sent messages the student did not author", "This is direct evidence that the account is being used to target others.", "strong", "risk", "sent")
      ],
      bestEvidence: ["suspicious_timeline", "unauthorized_forwarding", "account_abuse"],
      correctAssessment: "malicious",
      correctAction: "escalate",
      rationale: "The unknown sign-in is followed by an external forwarding rule, unauthorized app access, and messages the student did not send, confirming account compromise.",
      distractors: [
        "A far-away location alone proves compromise even if no account changes occurred.",
        "Changing the password is the only necessary action because every other session and app will always be removed automatically."
      ],
      hints: [
        "Put the events in time order and look for cause-and-effect relationships.",
        "Identify changes that could preserve access after a password change.",
        "Look for direct evidence that the account was used by someone else."
      ],
      misconceptionTags: ["Password change removes all access", "Location alone as proof", "Forwarding rules are harmless"],
      competencies: ["evidence_analysis", "incident_response", "authentication", "risk_communication"],
      nearTransferId: "i-forwarding-rule",
      response: {
        prompt: "Select the first five containment and recovery steps in order.",
        maxSteps: 5,
        steps: [
          { id: "notify", label: "Notify school IT and report the compromise", why: "Coordinates containment and organization-wide protection." },
          { id: "sessions", label: "Revoke active sessions", why: "Removes existing interactive access." },
          { id: "password", label: "Reset the password from a known clean device", why: "Replaces the exposed credential." },
          { id: "tokens", label: "Remove the unknown app and revoke its token", why: "Ends persistent application access." },
          { id: "rules", label: "Delete the forwarding rule and review mail settings", why: "Stops continued data exposure." },
          { id: "delete", label: "Delete the original phishing email first", why: "Deleting evidence before reporting can make investigation harder." },
          { id: "warn_public", label: "Post the account password publicly so classmates know it changed", why: "This would create additional exposure." }
        ],
        correctOrder: ["notify", "sessions", "password", "tokens", "rules"],
        success: "IT is engaged, active access is removed, the credential is replaced, persistent app access is revoked, and the forwarding rule is removed.",
        failure: "A password-only response can leave sessions, tokens, or forwarding rules active."
      },
      consequence: {
        ideal: "The account is contained, classmates are warned through an approved message, and the phishing campaign is blocked.",
        unsafe: "Only the password is changed. The attacker continues reading mail through the connected app and forwarding rule."
      },
      debrief: {
        what: "A confirmed school-account compromise that progressed from credential theft to persistence and phishing from a trusted account.",
        strongest: "The timeline, unauthorized forwarding, unauthorized app, and unapproved sent messages show both access and impact.",
        inconclusive: "Location alone can be imprecise, but it becomes meaningful when combined with unauthorized account changes.",
        next: "Escalate, revoke sessions, reset credentials from a clean device, remove tokens and rules, preserve evidence, and notify affected users.",
        plain: "Someone signed in, changed mail settings, connected an app, and messaged classmates. IT must contain the account, not just change the password."
      }
    }),

    S({
      id: "i-invoice-attachment",
      mission: "investigate",
      title: "Double-Extension Invoice Attachment",
      type: "email",
      technique: "Malicious attachment delivery",
      persuasion: ["Authority", "Urgency", "Routine business"],
      context: "The school office receives an invoice from a vendor name it recognizes, but no purchase order matches the amount.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "Northwest Classroom Supply",
        fromAddress: "billing@nw-classroom-supply.example",
        replyTo: "collections@invoice-resolution.example",
        to: "office@lincoln-hs.example",
        date: "9:03 AM",
        subject: "Past due invoice — service interruption today",
        body: [
          "Accounts Payable,",
          "Invoice 88431 is overdue. Open the attached invoice and confirm payment before 2:00 PM to avoid a service interruption.",
          "Billing Department"
        ],
        attachment: { name: "Invoice_88431.pdf.exe", size: "418 KB", type: "Application" }
      },
      inspections: [
        I("sender", "Sender and reply details", "identity", "The sender uses a brand-like example domain, while replies go to an unrelated invoice-resolution.example address.", ["reply_to_mismatch"]),
        I("attachment", "Complete filename", "file", "The complete name is Invoice_88431.pdf.exe. The final extension is .exe, so it is an application rather than a PDF document.", ["double_extension"]),
        I("context", "Purchase records", "history", "The invoice amount and number do not appear in the school's purchase-order system, and the known vendor contact has not sent a matching notice.", ["no_purchase_record"]),
        I("language", "Pressure pattern", "message", "The message threatens same-day service interruption to encourage opening the file quickly.", ["payment_pressure"])
      ],
      evidence: [
        E("reply_to_mismatch", "Replies go to an unrelated domain", "The response path does not match the claimed vendor identity.", "strong", "risk", "sender"),
        E("double_extension", "The attachment is an executable disguised as a PDF", "The final extension shows that opening it would run an application.", "strong", "risk", "attachment"),
        E("no_purchase_record", "No matching invoice or purchase order exists", "Independent business records contradict the message.", "strong", "risk", "context"),
        E("payment_pressure", "The message threatens immediate interruption", "Urgency supports concern but is not decisive alone.", "moderate", "risk", "language")
      ],
      bestEvidence: ["double_extension", "no_purchase_record", "reply_to_mismatch"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "The attachment is an executable disguised with a PDF-like name, the reply domain is unrelated, and no matching purchase record exists.",
      distractors: [
        "Every invoice attachment is malicious because real vendors use only paper invoices.",
        "The vendor name is familiar, so the attachment is safe if antivirus does not show an immediate warning."
      ],
      hints: [
        "Inspect the complete filename, especially the final extension.",
        "Compare the invoice with independent purchase records.",
        "Check whether the reply destination belongs to the claimed vendor."
      ],
      misconceptionTags: ["Familiar vendor name equals safe", "Visible PDF text equals file type", "Antivirus silence equals safe"],
      competencies: ["evidence_analysis", "data_protection", "domain_analysis"],
      nearTransferId: "p-browser-update",
      consequence: {
        ideal: "The attachment is quarantined and reported. Accounts Payable contacts the vendor using the saved procurement record.",
        unsafe: "The executable runs, giving the attacker access to the office workstation and shared files."
      },
      debrief: {
        what: "A malicious executable disguised as a routine invoice attachment.",
        strongest: "The final .exe extension, absent purchase record, and reply-domain mismatch are decisive.",
        inconclusive: "Urgency and a familiar vendor name can appear in both real and malicious business messages.",
        next: "Do not open the file. Report it and verify the invoice through the saved vendor contact or procurement system.",
        plain: "The file is really a program, not a PDF, and the invoice does not exist in school records. Report it."
      }
    }),

    S({
      id: "i-forwarding-rule",
      mission: "investigate",
      title: "Hidden Mail Forwarding Rule",
      type: "login",
      technique: "Account persistence and data collection",
      persuasion: ["Stealth"],
      context: "A student changed the password after a suspicious sign-in, but friends still report strange messages. The account settings show the following activity.",
      artifact: {
        kind: "login",
        app: "Mail Security",
        service: "Account Rules and Sessions",
        heading: "Recent changes",
        summary: "Review mail routing, sessions, and application access.",
        events: [
          { time: "Yesterday 6:02 PM", source: "Password", detail: "Password changed by account owner", status: "Completed" },
          { time: "Yesterday 5:54 PM", source: "Mail rule", detail: "If subject contains 'reset', forward to reset-archive@example.net", status: "Enabled" },
          { time: "Yesterday 5:51 PM", source: "Session", detail: "Firefox · Linux · Unknown device", status: "Active" },
          { time: "Yesterday 5:49 PM", source: "Connected app", detail: "Mail Export Utility", status: "Access active" }
        ]
      },
      inspections: [
        I("rule", "Forwarding rule", "mail", "A hidden rule forwards password-reset messages to an external address the student does not own.", ["targeted_forwarding"]),
        I("session", "Session status", "device", "An unfamiliar Linux session remains active even though the password was changed later.", ["persistent_session"]),
        I("app", "Connected app", "key", "Mail Export Utility still has access and was authorized before the password change.", ["persistent_token"]),
        I("timeline", "Change timeline", "activity", "The forwarding rule, session, and app access all began before the student changed the password and remain enabled afterward.", ["incomplete_containment"])
      ],
      evidence: [
        E("targeted_forwarding", "Reset messages are forwarded externally", "The rule targets security messages and can help an attacker capture recovery links.", "strong", "risk", "rule"),
        E("persistent_session", "An unfamiliar session remains active", "A password change did not automatically revoke this session.", "strong", "risk", "session"),
        E("persistent_token", "An unknown app retains access", "Application tokens may persist independently of the password.", "strong", "risk", "app"),
        E("incomplete_containment", "Compromise artifacts remain after the password change", "The timeline shows that the response addressed only one access path.", "strong", "risk", "timeline")
      ],
      bestEvidence: ["targeted_forwarding", "persistent_token", "incomplete_containment"],
      correctAssessment: "malicious",
      correctAction: "escalate",
      rationale: "External forwarding, an unfamiliar active session, and a persistent app token show that changing the password did not fully contain the compromise.",
      distractors: [
        "The new password means the remaining rules and applications cannot access anything important.",
        "Forwarding rules are only an email-management preference and are not part of security investigations."
      ],
      hints: [
        "Look for access methods that are separate from the current password.",
        "Inspect what kind of messages the rule targets.",
        "Compare when each artifact began with when the password was changed."
      ],
      misconceptionTags: ["Password-only containment", "Tokens depend on current password", "Mail rules are harmless"],
      competencies: ["evidence_analysis", "incident_response", "authentication"],
      nearTransferId: "i-compromised-school-account",
      response: {
        prompt: "Choose the first four actions needed to finish containment.",
        maxSteps: 4,
        steps: [
          { id: "report", label: "Escalate the still-active compromise to IT", why: "Coordinates investigation and account protection." },
          { id: "revoke", label: "Revoke all unfamiliar sessions", why: "Ends active interactive access." },
          { id: "remove_app", label: "Remove the unknown connected app", why: "Ends token-based access." },
          { id: "remove_rule", label: "Delete the external forwarding rule", why: "Stops continued mail exposure." },
          { id: "password_again", label: "Change the password repeatedly without reviewing access", why: "This leaves sessions, tokens, and rules untouched." },
          { id: "wait", label: "Wait to see whether more strange messages appear", why: "The compromise is already evidenced and active."
          }
        ],
        correctOrder: ["report", "revoke", "remove_app", "remove_rule"],
        success: "The remaining access paths are identified and removed under IT supervision.",
        failure: "Repeated password changes alone do not remove the existing session, token, or forwarding rule."
      },
      consequence: {
        ideal: "The remaining session, app token, and forwarding rule are removed, and the account is monitored for further changes.",
        unsafe: "The attacker continues receiving reset messages and using the connected app despite the new password."
      },
      debrief: {
        what: "An account compromise that persists through active sessions, app tokens, and targeted mail forwarding.",
        strongest: "The security-focused forwarding rule and persistent token demonstrate why password-only recovery is incomplete.",
        inconclusive: "A password change is useful, but it does not prove that every other access path has ended.",
        next: "Escalate, revoke sessions and tokens, remove rules, verify recovery information, and continue monitoring.",
        plain: "The attacker still has other ways into the account after the password change. IT must remove sessions, apps, and forwarding rules."
      }
    }),

    S({
      id: "i-travel-login-alert",
      mission: "investigate",
      title: "Expected New-Location Sign-In",
      type: "email",
      technique: "Legitimate security notification",
      persuasion: ["Security awareness"],
      context: "Alex is visiting family in Portland and signed in from a new iPhone at 7:31 PM. The alert arrived immediately afterward.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "Lincoln High Account Security",
        fromAddress: "security@lincoln-hs.example",
        replyTo: "no-reply@lincoln-hs.example",
        to: "alex@students.lincoln-hs.example",
        date: "7:31 PM",
        subject: "New sign-in to your school account",
        body: [
          "Hi Alex,",
          "We noticed a sign-in from a new device.",
          "Device: iPhone · Browser: Safari · Approximate location: Portland, Oregon · Time: 7:31 PM",
          "If this was you, no action is required. If not, open the school portal directly and report it."
        ],
        link: null
      },
      inspections: [
        I("sender", "Sender details", "identity", "The alert comes from security@lincoln-hs.example and contains no external link.", ["official_security_sender"]),
        I("device", "Device comparison", "device", "The device and browser match the iPhone Alex used to sign in.", ["matching_device"]),
        I("location", "Location comparison", "map", "The approximate Portland location matches Alex's current trip.", ["matching_location"]),
        I("activity", "Account activity", "history", "The independently opened security page shows the same successful sign-in at 7:31 PM and no other unfamiliar activity.", ["matching_account_record"])
      ],
      evidence: [
        E("official_security_sender", "The alert uses the school security domain and no external link", "The message points the user back to an independently opened portal.", "strong", "safe", "sender"),
        E("matching_device", "The device matches the student's sign-in", "The technical details align with known activity.", "strong", "safe", "device"),
        E("matching_location", "The location matches the student's current trip", "Approximate location is consistent with context.", "moderate", "safe", "location"),
        E("matching_account_record", "The official account record matches the alert", "An independent trusted source confirms the event and shows no additional anomalies.", "strong", "safe", "activity")
      ],
      bestEvidence: ["matching_device", "matching_account_record", "official_security_sender"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The alert matches the student's device, time, location, and independently verified account record, with no additional suspicious activity.",
      distractors: [
        "Any sign-in alert means the account has already been compromised.",
        "The message is safe only because it does not contain a clickable link."
      ],
      hints: [
        "Compare every technical detail with what the student actually did.",
        "Use the independently opened account-activity page as the trusted source.",
        "Check for additional changes rather than treating a new location as proof of compromise."
      ],
      misconceptionTags: ["Every login alert means compromise", "No link equals safe"],
      competencies: ["evidence_analysis", "authentication"],
      nearTransferId: "p-mfa-fatigue",
      consequence: {
        ideal: "Alex recognizes the verified event, takes no emergency action, and continues monitoring normally.",
        unsafe: "Unnecessary account recovery and escalation create confusion despite all evidence matching known activity."
      },
      debrief: {
        what: "A legitimate security alert generated by the student's own sign-in from a new location and device.",
        strongest: "The matching device and independently verified account record support proceeding.",
        inconclusive: "A new location can be suspicious, expected during travel, or imprecise because of network routing.",
        next: "No emergency response is needed. Continue to review future alerts and report any event that does not match known activity.",
        plain: "The alert matches the exact sign-in Alex just made. No emergency action is needed."
      }
    }),

    S({
      id: "i-teacher-compromised-share",
      mission: "investigate",
      title: "Trusted Teacher Account Sends 86 Shares",
      type: "login",
      technique: "Compromised trusted account",
      persuasion: ["Authority", "Familiarity"],
      context: "A document-share message came from a real teacher account. School security provides the following activity summary before students decide what to do.",
      artifact: {
        kind: "login",
        app: "Security Console",
        service: "Teacher Account Activity",
        heading: "Ms. Rivera — recent events",
        summary: "Compare sign-in, sharing, and mailbox behavior.",
        events: [
          { time: "1:36 AM", source: "Chrome · Linux", detail: "Frankfurt, Germany", status: "Successful sign-in" },
          { time: "1:39 AM", source: "Drive", detail: "Public file created: Grade Review", status: "Created" },
          { time: "1:42 AM", source: "Mail", detail: "86 messages sent to students", status: "Completed" },
          { time: "1:45 AM", source: "Mailbox", detail: "Sent messages moved to Trash", status: "Completed" }
        ]
      },
      inspections: [
        I("signin", "Sign-in evidence", "map", "The account signed in from an unfamiliar Linux device in Germany while the teacher was known to be in Washington.", ["unfamiliar_teacher_signin"]),
        I("volume", "Sharing volume", "activity", "Eighty-six students received nearly identical messages within three minutes.", ["bulk_send_pattern"]),
        I("file", "Shared file behavior", "file", "The public file contains a button leading to a separate school-login-check.example site.", ["malicious_file_link"]),
        I("cleanup", "Mailbox cleanup", "trash", "Sent messages were moved to Trash immediately after delivery, which may be an attempt to hide activity from the teacher.", ["evidence_hiding"])
      ],
      evidence: [
        E("unfamiliar_teacher_signin", "The teacher account has an impossible sign-in pattern", "The device, location, and time conflict with known teacher activity.", "strong", "risk", "signin"),
        E("bulk_send_pattern", "The account sent a rapid bulk campaign", "The volume and timing are inconsistent with an individual grade-review request.", "strong", "risk", "volume"),
        E("malicious_file_link", "The shared file redirects to an off-domain login page", "A legitimate cloud file is being used as an intermediate lure.", "strong", "risk", "file"),
        E("evidence_hiding", "Sent messages were moved to Trash", "Hiding outbound activity supports the compromise hypothesis.", "strong", "risk", "cleanup")
      ],
      bestEvidence: ["bulk_send_pattern", "malicious_file_link", "evidence_hiding"],
      correctAssessment: "malicious",
      correctAction: "escalate",
      rationale: "The trusted account shows an unfamiliar sign-in, bulk student targeting, an off-domain login lure, and attempted cleanup, confirming compromise.",
      distractors: [
        "Messages from a real teacher account should be followed because the school controls the account.",
        "The late hour alone proves the teacher account was compromised."
      ],
      hints: [
        "A real account can become the delivery mechanism for an attack.",
        "Compare one student's message with the full sending pattern.",
        "Look for signs that someone tried to hide the activity."
      ],
      misconceptionTags: ["Official account cannot be compromised", "Late hour alone as proof", "Legitimate cloud file equals safe"],
      competencies: ["evidence_analysis", "incident_response", "identity_verification", "risk_communication"],
      nearTransferId: "r-teacher-grade-share",
      response: {
        prompt: "Choose the first four organization-level response steps.",
        maxSteps: 4,
        steps: [
          { id: "quarantine", label: "Quarantine the campaign and block the off-domain destination", why: "Reduces additional exposure immediately." },
          { id: "contain", label: "Disable or contain the teacher account", why: "Stops continued use while the owner is verified." },
          { id: "preserve", label: "Preserve sign-in, mail, and file-sharing evidence", why: "Supports investigation and notification." },
          { id: "notify", label: "Notify recipients with clear protective steps", why: "Helps students who may have clicked or entered credentials." },
          { id: "delete_all", label: "Delete every log after blocking the link", why: "This destroys useful evidence." },
          { id: "blame", label: "Publicly identify the teacher as the cause", why: "A compromised user should be supported, not blamed."
          }
        ],
        correctOrder: ["quarantine", "contain", "preserve", "notify"],
        success: "The campaign is stopped, the account is contained, evidence is preserved, and recipients receive clear guidance.",
        failure: "Deleting evidence or blaming the account owner weakens the investigation and discourages future reporting."
      },
      consequence: {
        ideal: "The school blocks the destination, contains the teacher account, and gives students a non-blaming incident notice.",
        unsafe: "Students trust the real account and the campaign spreads through additional compromised school identities."
      },
      debrief: {
        what: "A compromised teacher account used to distribute a cloud-document phishing campaign to students.",
        strongest: "The bulk-send pattern, off-domain login lure, and cleanup behavior confirm malicious use of a legitimate account.",
        inconclusive: "A real sender address or real cloud platform establishes infrastructure, not current owner intent.",
        next: "Quarantine, contain, preserve evidence, notify recipients, reset access, and review affected accounts without blaming the teacher.",
        plain: "A real teacher account was taken over and used to message many students. The school must stop the campaign and help affected users."
      }
    }),

    S({
      id: "i-helpdesk-verified-session",
      mission: "investigate",
      title: "Verified Remote Support Session",
      type: "chat",
      technique: "Legitimate technical support",
      persuasion: ["Authority", "Helpfulness"],
      context: "Alex opened a support ticket from the school portal about a broken VPN connection and selected a scheduled remote-support appointment.",
      artifact: {
        kind: "chat",
        app: "School Support Portal",
        header: "Ticket LHS-28417 · VPN assistance",
        agentName: "Priya N. · Lincoln High IT",
        transcript: [
          { who: "agent", text: "Hi Alex. I am joining the appointment for ticket LHS-28417. Please confirm the last two characters of the ticket number shown in your portal." },
          { who: "user", text: "17" },
          { who: "agent", text: "Thank you. The portal will now display a one-time screen-sharing consent button. I will not ask for your password or MFA code." },
          { who: "agent", text: "You can stop sharing at any time. I only need to view the VPN settings page." }
        ]
      },
      inspections: [
        I("source", "Portal source", "link", "The chat is embedded in support.lincoln-hs.example, opened from Alex's authenticated ticket page.", ["official_support_portal"]),
        I("ticket", "Ticket verification", "history", "The ticket number, issue, and appointment time match the request Alex created earlier.", ["matching_ticket"]),
        I("agent", "Agent identity", "identity", "Priya N. appears in the school IT directory and is assigned to the ticket in the portal.", ["verified_agent"]),
        I("scope", "Support request scope", "shield", "The agent requests limited, revocable screen sharing and explicitly says not to provide a password or MFA code.", ["limited_support_scope"])
      ],
      evidence: [
        E("official_support_portal", "The session is inside the known support portal", "The channel is independently authenticated and belongs to the school domain.", "strong", "safe", "source"),
        E("matching_ticket", "The conversation matches a student-created ticket", "The issue, number, and appointment provide specific expected context.", "strong", "safe", "ticket"),
        E("verified_agent", "The assigned agent is listed in the directory", "The identity can be independently verified.", "strong", "safe", "agent"),
        E("limited_support_scope", "The access request is limited and revocable", "The request follows least privilege and avoids authentication secrets.", "strong", "safe", "scope")
      ],
      bestEvidence: ["official_support_portal", "matching_ticket", "verified_agent"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The support session is inside the official portal, matches a student-created ticket, and uses a verified agent with limited, revocable access.",
      distractors: [
        "Remote-support requests are always malicious because legitimate IT never views a user's screen.",
        "The session is safe only because the agent sounds professional and says not to share a password."
      ],
      hints: [
        "Compare the support session with the ticket Alex created independently.",
        "Verify the agent through the portal or directory rather than tone alone.",
        "Review whether the requested access is limited, relevant, and revocable."
      ],
      misconceptionTags: ["All remote support is malicious", "Professional tone proves identity"],
      competencies: ["identity_verification", "defensive_controls"],
      nearTransferId: "p-backup-code-request",
      consequence: {
        ideal: "Alex grants limited screen sharing for the VPN settings and ends the session when the issue is resolved.",
        unsafe: "Automatically rejecting a verified, least-privilege support session prevents resolution and increases false positives."
      },
      debrief: {
        what: "A legitimate support session tied to a verified ticket, portal, agent, and limited access request.",
        strongest: "The official portal, matching ticket, and verified agent support proceeding.",
        inconclusive: "A professional tone or a statement about security is not proof without an authenticated channel and expected context.",
        next: "Proceed with limited sharing, monitor what is viewed, and stop the session if the scope changes or secrets are requested.",
        plain: "Alex created this ticket, the agent is verified, and the sharing request is limited. It is reasonable to continue."
      }
    })
  );

  /* Mission 5: Respond and Communicate */
  scenarios.push(
    S({
      id: "c-account-takeover",
      mission: "respond",
      title: "Recovery Information Replaced",
      type: "login",
      technique: "Full account takeover",
      persuasion: ["Stealth", "Persistence"],
      context: "A student can no longer sign in. The recovery screen and a security notification sent to a trusted device show these changes.",
      artifact: {
        kind: "login",
        app: "Account Recovery",
        service: "Student Account Security",
        heading: "Security settings changed",
        summary: "Multiple identity and recovery settings were modified in one session.",
        events: [
          { time: "4:12 PM", source: "Recovery email", detail: "Changed to a***@mailbox.example.net", status: "Changed" },
          { time: "4:13 PM", source: "MFA", detail: "Student authenticator removed", status: "Removed" },
          { time: "4:14 PM", source: "MFA", detail: "New security key enrolled", status: "Added" },
          { time: "4:15 PM", source: "Password", detail: "Password changed", status: "Changed" },
          { time: "4:17 PM", source: "Session", detail: "Unknown Windows device", status: "Active" }
        ]
      },
      inspections: [
        I("recovery", "Recovery settings", "key", "The recovery email was replaced with an external address the student does not control.", ["recovery_hijacked"]),
        I("mfa", "Authentication changes", "shield", "The student's authenticator was removed and a new security key was enrolled immediately afterward.", ["mfa_replaced"]),
        I("session", "Session details", "device", "An unknown Windows session remains active and made all recorded changes.", ["attacker_session"]),
        I("timeline", "Change timeline", "activity", "The recovery email, MFA, password, and session changes occurred within five minutes without student authorization.", ["takeover_sequence"])
      ],
      evidence: [
        E("recovery_hijacked", "The recovery channel belongs to someone else", "The attacker can intercept future recovery attempts.", "strong", "risk", "recovery"),
        E("mfa_replaced", "The original MFA method was removed", "The attacker has replaced the student's proof of identity with their own factor.", "strong", "risk", "mfa"),
        E("attacker_session", "An unknown session remains active", "The session can continue changing settings or accessing data.", "strong", "risk", "session"),
        E("takeover_sequence", "Multiple identity controls changed in one unauthorized sequence", "The pattern confirms full account takeover rather than a single mistaken alert.", "strong", "risk", "timeline")
      ],
      bestEvidence: ["recovery_hijacked", "mfa_replaced", "takeover_sequence"],
      correctAssessment: "malicious",
      correctAction: "escalate",
      rationale: "Unauthorized changes to recovery, MFA, password, and active sessions confirm a full account takeover that requires organizational recovery support.",
      distractors: [
        "The student should keep trying passwords until the system automatically restores the account.",
        "Changing the password from the compromised session is enough even though the attacker controls recovery and MFA."
      ],
      hints: [
        "Identify which settings determine who can recover and prove ownership of the account.",
        "Look for a coordinated sequence rather than treating each alert separately.",
        "Consider what the student can and cannot safely repair without organizational support."
      ],
      misconceptionTags: ["Password-only recovery", "Repeated login attempts solve takeover", "Recovery channels are secondary"],
      competencies: ["incident_response", "authentication", "risk_communication", "evidence_analysis"],
      nearTransferId: "i-compromised-school-account",
      response: {
        prompt: "Choose the first five recovery actions in the safest order.",
        maxSteps: 5,
        steps: [
          { id: "trusted_report", label: "Contact school IT from a trusted device and verified channel", why: "The student cannot safely restore ownership alone after recovery and MFA replacement." },
          { id: "contain", label: "Ask IT to disable or contain the account temporarily", why: "Stops ongoing access while identity is verified." },
          { id: "restore_identity", label: "Restore the correct recovery channel and MFA method", why: "Returns account ownership to the student." },
          { id: "reset", label: "Reset the password and revoke all sessions", why: "Replaces the credential and removes existing interactive access." },
          { id: "review", label: "Review apps, mail rules, sent items, and affected data", why: "Finds persistence and determines impact." },
          { id: "public_post", label: "Post account details publicly to ask classmates for help", why: "This exposes additional information and is not a recovery channel." },
          { id: "pay", label: "Pay an online recovery service that promises instant access", why: "Unverified recovery services can create another scam."
          }
        ],
        correctOrder: ["trusted_report", "contain", "restore_identity", "reset", "review"],
        success: "A trusted support channel contains the account, restores identity controls, resets access, and investigates impact.",
        failure: "Password-only or unverified recovery attempts leave the attacker in control or create additional exposure."
      },
      consequence: {
        ideal: "The account is contained, ownership is restored through verified school procedures, and affected contacts receive a clear notice.",
        unsafe: "The attacker maintains recovery control and continues impersonating the student despite repeated password attempts."
      },
      debrief: {
        what: "A full account takeover in which the attacker replaced recovery and multifactor authentication controls.",
        strongest: "Recovery hijacking and MFA replacement show that the attacker controls the mechanisms used to prove ownership.",
        inconclusive: "A single password alert could be accidental; the coordinated settings sequence confirms the incident.",
        next: "Use a trusted device and verified support channel to contain the account, restore identity controls, revoke access, and investigate impact.",
        plain: "The attacker changed every setting used to prove who owns the account. School IT must help restore it safely."
      }
    }),

    S({
      id: "c-qr-scholarship",
      mission: "respond",
      title: "Scholarship QR Sticker Over Official Poster",
      type: "qr",
      technique: "QR-code replacement phishing",
      persuasion: ["Reward", "Authority", "Scarcity"],
      context: "A student notices that a glossy QR sticker has been placed over the printed code on a counselor's scholarship poster.",
      artifact: {
        kind: "qr",
        app: "Hallway Poster",
        posterTitle: "Senior Scholarship Workshop",
        copy: "Scan to register. First 30 students receive application-fee vouchers.",
        organizer: "Lincoln High Counseling Office",
        footer: "Poster code appears covered by a separate sticker",
        encodedUrl: "https://senior-awards.example/lincoln"
      },
      inspections: [
        I("physical", "Physical inspection", "search", "The QR code is a separate sticker placed over another printed code. The sticker edges and different gloss are visible.", ["code_replaced"]),
        I("qr", "Sticker destination", "qr", "The sticker resolves to senior-awards.example/lincoln, which is outside the school's domain.", ["external_scholarship_domain"]),
        I("official", "Original poster record", "history", "The counseling office's digital poster uses counseling.lincoln-hs.example/workshop and does not mention a voucher limit.", ["official_poster_conflict"]),
        I("request", "Registration form", "shield", "The sticker destination requests a school password, birth date, and a $15 refundable reservation fee.", ["credential_and_fee_request"])
      ],
      evidence: [
        E("code_replaced", "A sticker covers the original printed code", "Physical replacement is direct evidence that the displayed destination may not be authorized.", "strong", "risk", "physical"),
        E("external_scholarship_domain", "The sticker leads outside the school domain", "The destination cannot be connected to the counseling office.", "strong", "risk", "qr"),
        E("official_poster_conflict", "The official digital poster uses a different destination and offer", "An independent school source contradicts the altered poster.", "strong", "risk", "official"),
        E("credential_and_fee_request", "The form requests a password and advance fee", "The requested data and payment are unnecessary for workshop registration.", "strong", "risk", "request")
      ],
      bestEvidence: ["code_replaced", "official_poster_conflict", "credential_and_fee_request"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "A replacement sticker directs students to an off-domain form that conflicts with the official poster and requests credentials plus an advance fee.",
      distractors: [
        "All scholarship posters with QR codes should be removed because physical codes cannot be made safe.",
        "The code must be legitimate because the poster itself belongs to the counseling office."
      ],
      hints: [
        "Inspect the physical relationship between the sticker and poster.",
        "Compare the scanned destination with the counseling office's independently opened page.",
        "Ask whether the requested password and fee are necessary for workshop registration."
      ],
      misconceptionTags: ["Trusted poster makes replacement safe", "All QR codes are malicious", "Refundable fee is harmless"],
      competencies: ["incident_response", "domain_analysis", "risk_communication", "data_protection"],
      nearTransferId: "r-club-fundraiser",
      response: {
        prompt: "Choose the first four response and communication steps.",
        maxSteps: 4,
        steps: [
          { id: "prevent", label: "Prevent additional scans without destroying the poster", why: "Reduces exposure while preserving useful physical evidence." },
          { id: "report", label: "Notify counseling, school IT, and facilities", why: "Coordinates physical removal, technical blocking, and investigation." },
          { id: "preserve", label: "Photograph the sticker and record its destination", why: "Preserves evidence before authorized removal." },
          { id: "notify", label: "Issue a clear notice with the correct school link", why: "Helps students who scanned the code and provides a safe alternative." },
          { id: "tear", label: "Destroy the sticker immediately and discard it", why: "This can eliminate evidence before the response team documents it." },
          { id: "shame", label: "Publicly list students who scanned it", why: "Blaming users discourages reporting and is unnecessary."
          }
        ],
        correctOrder: ["prevent", "report", "preserve", "notify"],
        success: "Further scans are limited, the incident is documented, response teams are engaged, and students receive a safe replacement link.",
        failure: "Destroying evidence or blaming students weakens the response and discourages future reporting."
      },
      consequence: {
        ideal: "The altered code is documented and removed, the destination is blocked, and students receive a non-blaming notice with recovery steps.",
        unsafe: "More students scan the code, enter school credentials, and pay the fake reservation fee."
      },
      debrief: {
        what: "A QR-code replacement attack that uses a trusted physical poster to deliver credential and payment phishing.",
        strongest: "The replacement sticker, conflict with the official poster, and unnecessary credential-and-fee request are decisive.",
        inconclusive: "The hallway location and official poster design do not prove that a sticker placed on top is authorized.",
        next: "Limit exposure, report through school channels, preserve evidence, remove the sticker through authorized staff, and notify affected students without blame.",
        plain: "Someone covered the real school code with a fake one. Stop more scans, report it, save evidence, and share the correct link."
      }
    }),

    S({
      id: "c-deepfake-coach",
      mission: "respond",
      title: "Coach Voice Message Requests Gift Cards",
      type: "voicemail",
      technique: "Potential AI voice impersonation",
      persuasion: ["Authority", "Urgency", "Trust", "Team loyalty"],
      context: "A voicemail sounds like the basketball coach and asks the team captain to buy gift cards for a stranded bus. No trip is shown on the team calendar.",
      artifact: {
        kind: "voicemail",
        app: "Voicemail",
        caller: "Coach Daniels · Caller ID displayed",
        time: "6:48 AM",
        duration: "0:31",
        transcript: "Hey, it is Coach. The team bus payment system failed and the driver needs $300 in gift cards before we can leave. Buy them now and text the codes to this number. Do not call because I am dealing with the driver. I need you to help the team fast."
      },
      inspections: [
        I("caller", "Caller identity", "phone", "Caller ID displays the coach's name, but caller ID can be spoofed and the callback number differs from the saved team directory number.", ["spoofable_caller_id"]),
        I("voice", "Voice characteristics", "wave", "The voice resembles the coach, but a familiar-sounding voice can be recorded, imitated, or generated. Audio similarity alone cannot verify identity.", ["voice_not_identity_proof"]),
        I("context", "Team schedule", "history", "The official calendar shows no trip, bus reservation, or early departure today.", ["schedule_conflict"]),
        I("request", "Payment request", "card", "The caller requests gift-card codes, asks the student not to call, and creates immediate pressure around team loyalty.", ["irreversible_payment_request"])
      ],
      evidence: [
        E("spoofable_caller_id", "The displayed caller name cannot verify the source", "Caller ID can be manipulated, and the number differs from the saved directory entry.", "strong", "risk", "caller"),
        E("voice_not_identity_proof", "A familiar voice is not sufficient identity proof", "Recorded or generated audio can imitate a known person.", "strong", "neutral", "voice"),
        E("schedule_conflict", "The request conflicts with the official team schedule", "An independent source provides no support for the emergency story.", "strong", "risk", "context"),
        E("irreversible_payment_request", "The caller requests gift-card codes and blocks callback", "Gift-card codes are hard to recover and the no-call instruction prevents verification.", "strong", "risk", "request")
      ],
      bestEvidence: ["schedule_conflict", "irreversible_payment_request", "spoofable_caller_id"],
      correctAssessment: "uncertain",
      correctAction: "verify",
      rationale: "The voice and caller ID are not reliable identity proof, the emergency conflicts with the team schedule, and the gift-card request should be verified through the coach's saved number or school office.",
      distractors: [
        "The voice sounds exactly like the coach, so it is safe to help before calling back.",
        "Any voicemail asking for urgent help is automatically an AI deepfake."
      ],
      hints: [
        "Separate 'sounds familiar' from verified identity.",
        "Check the story against an independent team source.",
        "Choose a callback method that does not use the number in the message."
      ],
      misconceptionTags: ["Voice equals identity", "Caller ID equals identity", "Every urgent voicemail is deepfake"],
      competencies: ["identity_verification", "social_engineering", "risk_communication"],
      nearTransferId: "c-finance-request",
      response: {
        prompt: "Choose the first three safe response steps.",
        maxSteps: 3,
        steps: [
          { id: "hold", label: "Do not purchase or send gift-card codes", why: "Prevents an irreversible payment while identity is unresolved." },
          { id: "known_contact", label: "Call the coach using the saved team-directory number", why: "Uses an independent trusted channel." },
          { id: "office", label: "Confirm the trip with the athletics office if the coach is unavailable", why: "Provides a second official source." },
          { id: "reply", label: "Call the number from the voicemail", why: "This keeps the student inside the attacker's chosen channel." },
          { id: "buy_small", label: "Buy one smaller gift card as a test", why: "Any code sent to an attacker is likely unrecoverable."
          }
        ],
        correctOrder: ["hold", "known_contact", "office"],
        success: "Payment is paused while the coach and trip are verified through known school contacts.",
        failure: "Using the message's number or sending a test payment does not independently verify identity."
      },
      consequence: {
        ideal: "The student calls the saved coach number. The coach confirms there is no trip and reports the impersonation to the school.",
        unsafe: "The student sends gift-card codes that are redeemed before anyone verifies the story."
      },
      debrief: {
        what: "A likely impersonation attempt that may use recorded or AI-generated voice, but the learner does not need to prove the generation method before acting safely.",
        strongest: "The schedule conflict, irreversible gift-card request, and blocked callback justify independent verification.",
        inconclusive: "A familiar voice or caller ID is not reliable identity proof, while an odd voice alone does not prove AI generation.",
        next: "Pause payment and contact the coach or athletics office through known numbers. Report confirmed impersonation.",
        plain: "The voice may sound real, but the story does not match the schedule and asks for gift cards. Call the coach another way before doing anything."
      }
    }),

    S({
      id: "c-ransomware-notice",
      mission: "respond",
      title: "Shared Drive Files Become Encrypted",
      type: "login",
      technique: "Ransomware incident response",
      persuasion: ["Fear", "Deadline"],
      context: "After a staff member opens an unknown attachment, shared-drive filenames change and a ransom note appears. Students analyze the safe, instructor-provided incident summary rather than touching real malware.",
      artifact: {
        kind: "login",
        app: "Incident Console",
        service: "File Server Alerts",
        heading: "Multiple file integrity events",
        summary: "The system reports rapid changes across a shared course drive.",
        events: [
          { time: "10:02 AM", source: "Endpoint LHS-OFFICE-12", detail: "Unknown attachment executed", status: "Alert" },
          { time: "10:04 AM", source: "Shared drive", detail: "1,284 files renamed with .locked extension", status: "Critical" },
          { time: "10:05 AM", source: "Network", detail: "Large outbound connection to files-pay.example", status: "Blocked" },
          { time: "10:06 AM", source: "Desktop", detail: "READ_TO_RESTORE.txt created", status: "Detected" }
        ]
      },
      inspections: [
        I("endpoint", "Initial endpoint alert", "device", "The file changes begin from one office endpoint immediately after an unknown attachment executes.", ["likely_initial_host"]),
        I("files", "File impact", "file", "More than one thousand shared files are renamed in two minutes, indicating automated encryption or destructive modification.", ["rapid_encryption_pattern"]),
        I("network", "Network activity", "network", "The system blocks an outbound connection to files-pay.example during the encryption window.", ["suspicious_outbound"]),
        I("note", "Ransom note", "document", "The note demands cryptocurrency within 24 hours and threatens to delete the recovery key. It is evidence, not a trusted instruction.", ["ransom_demand"])
      ],
      evidence: [
        E("likely_initial_host", "One endpoint appears to be the initial source", "The timing helps prioritize containment and investigation.", "strong", "risk", "endpoint"),
        E("rapid_encryption_pattern", "Files change at automated scale", "The volume and speed are consistent with a ransomware-style incident.", "strong", "risk", "files"),
        E("suspicious_outbound", "Outbound communication occurs during the incident", "The connection may indicate command, payment, or data-exfiltration infrastructure.", "strong", "risk", "network"),
        E("ransom_demand", "A ransom note demands payment under a deadline", "The note confirms extortion behavior but should not direct the response.", "strong", "risk", "note")
      ],
      bestEvidence: ["likely_initial_host", "rapid_encryption_pattern", "suspicious_outbound"],
      correctAssessment: "malicious",
      correctAction: "escalate",
      rationale: "Rapid automated file encryption, a likely initial endpoint, and suspicious outbound activity indicate an active ransomware incident requiring immediate coordinated containment.",
      distractors: [
        "The fastest response is to pay immediately because the ransom note provides the only possible recovery path.",
        "Every affected computer should be wiped before logs and evidence are preserved."
      ],
      hints: [
        "Prioritize stopping spread and involving the incident-response team.",
        "Identify which evidence should be preserved before systems are rebuilt.",
        "Do not treat the attacker's deadline as the organization's response plan."
      ],
      misconceptionTags: ["Pay first", "Destroy evidence during cleanup", "Ransom note is trusted guidance"],
      competencies: ["incident_response", "evidence_analysis", "defensive_controls", "risk_communication"],
      nearTransferId: "i-invoice-attachment",
      response: {
        prompt: "Choose the first five incident-response actions in order.",
        maxSteps: 5,
        steps: [
          { id: "isolate", label: "Isolate the affected endpoint and limit shared-drive access", why: "Reduces continued spread while preserving the device for response." },
          { id: "activate", label: "Activate the school incident-response process", why: "Brings authorized technical, leadership, legal, and communication roles together." },
          { id: "preserve", label: "Preserve logs, the ransom note, and relevant system evidence", why: "Supports scope analysis, recovery, and any required reporting." },
          { id: "scope", label: "Determine affected systems, accounts, backups, and possible data exposure", why: "Guides containment and recovery priorities." },
          { id: "recover", label: "Restore through the approved recovery and backup plan", why: "Uses trusted recovery sources after containment and validation." },
          { id: "pay", label: "Send payment before contacting anyone", why: "Payment may not restore data and bypasses the organization's response process." },
          { id: "wipe", label: "Wipe every device immediately", why: "Premature wiping can destroy evidence and may not address the full scope."
          }
        ],
        correctOrder: ["isolate", "activate", "preserve", "scope", "recover"],
        success: "Spread is limited, the response team is activated, evidence is preserved, scope is understood, and recovery uses approved backups.",
        failure: "Immediate payment or indiscriminate wiping can increase harm and eliminate evidence without containing the full incident."
      },
      consequence: {
        ideal: "The school limits spread, preserves evidence, determines scope, communicates appropriately, and restores validated systems from approved backups.",
        unsafe: "Uncoordinated actions destroy evidence, allow additional spread, or send payment without reliable recovery."
      },
      debrief: {
        what: "A ransomware-style incident affecting a shared drive after execution of an unknown attachment.",
        strongest: "The likely initial host, rapid file encryption, and suspicious outbound activity establish an active technical incident.",
        inconclusive: "The ransom note explains the attacker's demand, not the full scope or correct organizational response.",
        next: "Isolate, activate the response plan, preserve evidence, assess scope and exposure, communicate through authorized channels, and recover from validated backups.",
        plain: "Files are being encrypted quickly. Stop the spread, call the response team, save evidence, find the scope, and recover from trusted backups."
      }
    }),

    S({
      id: "c-oauth-token-abuse",
      mission: "respond",
      title: "Connected App Persists After Password Change",
      type: "login",
      technique: "OAuth token persistence and account abuse",
      persuasion: ["Stealth", "Convenience"],
      context: "A student changed the password after approving a study app, but new messages continue to appear in Sent Items.",
      artifact: {
        kind: "login",
        app: "Connected Apps",
        service: "School Account",
        heading: "Third-party access",
        summary: "Review applications that can access account data without using the current password.",
        events: [
          { time: "Monday", source: "Study Sync Pro", detail: "Read and send mail · Read contacts", status: "Access granted" },
          { time: "Tuesday 9:02 AM", source: "Password", detail: "Password changed by student", status: "Completed" },
          { time: "Tuesday 9:18 AM", source: "Study Sync Pro", detail: "12 messages sent through application API", status: "Completed" },
          { time: "Tuesday 9:20 AM", source: "Study Sync Pro", detail: "Contacts exported", status: "Completed" }
        ]
      },
      inspections: [
        I("permissions", "App permissions", "key", "The app can read and send mail plus read contacts, using a persistent authorization token.", ["persistent_permissions"]),
        I("timeline", "Post-password activity", "activity", "The app sends messages and exports contacts after the password was changed.", ["token_survived_password"]),
        I("sent", "Sent-message content", "mail", "The messages contain a shared-notes lure and were not written by the student.", ["api_account_abuse"]),
        I("policy", "Approved-app catalog", "policy", "Study Sync Pro is not an approved school application and has been reported by other students.", ["known_unsafe_app"])
      ],
      evidence: [
        E("persistent_permissions", "The app has broad persistent permissions", "The token can act without re-entering the current password.", "strong", "risk", "permissions"),
        E("token_survived_password", "Activity continues after the password change", "The timeline proves that password-only containment did not end app access.", "strong", "risk", "timeline"),
        E("api_account_abuse", "The app sent unauthorized messages", "This is direct evidence of malicious use through the account API.", "strong", "risk", "sent"),
        E("known_unsafe_app", "The app is unapproved and linked to other reports", "Organizational evidence supports removal and broader response.", "strong", "risk", "policy")
      ],
      bestEvidence: ["token_survived_password", "api_account_abuse", "persistent_permissions"],
      correctAssessment: "malicious",
      correctAction: "escalate",
      rationale: "The connected app continues sending unauthorized messages after the password change because its persistent token and broad permissions remain active.",
      distractors: [
        "Changing the password again will eventually invalidate every application token automatically.",
        "The app cannot be responsible because the messages were sent from the student's real account."
      ],
      hints: [
        "Compare app activity before and after the password change.",
        "Identify which access method does not require the current password.",
        "Look for direct evidence of unauthorized actions through the API."
      ],
      misconceptionTags: ["Password changes revoke every token", "Real account means user sent it", "Connected apps are only convenience tools"],
      competencies: ["incident_response", "authentication", "evidence_analysis", "defensive_controls"],
      nearTransferId: "v-oauth-study-app",
      response: {
        prompt: "Choose the first four containment and recovery steps.",
        maxSteps: 4,
        steps: [
          { id: "report", label: "Report the connected-app compromise to school IT", why: "Enables organization-wide blocking and investigation." },
          { id: "revoke", label: "Revoke the app's token and permissions", why: "Ends the access path that survived the password change." },
          { id: "sessions", label: "Review and revoke unfamiliar sessions and apps", why: "Checks for additional persistence." },
          { id: "notify", label: "Notify recipients of unauthorized messages", why: "Helps contacts avoid the lure and report related activity." },
          { id: "password_loop", label: "Change the password repeatedly without revoking the app", why: "The token may remain active." },
          { id: "delete_sent", label: "Delete sent messages before reporting", why: "This removes evidence without containing app access."
          }
        ],
        correctOrder: ["report", "revoke", "sessions", "notify"],
        success: "The token is revoked, other persistence is reviewed, and recipients receive clear protective guidance.",
        failure: "Password-only actions leave the persistent token active and allow continued abuse."
      },
      consequence: {
        ideal: "The app token is revoked, the campaign is blocked, other permissions are reviewed, and recipients are warned.",
        unsafe: "The app continues reading mail and sending lures even after another password change."
      },
      debrief: {
        what: "A connected application abusing persistent OAuth permissions after the account password was changed.",
        strongest: "Post-password app activity and unauthorized API-sent messages prove that the token remains active.",
        inconclusive: "A password change is important but does not guarantee revocation of every session or token.",
        next: "Escalate, revoke the app, review all connected access, preserve evidence, and notify affected recipients.",
        plain: "The app still has account access even after the password changed. Revoke the app and report the incident."
      }
    }),

    S({
      id: "c-finance-request",
      mission: "respond",
      title: "Principal Requests Emergency Gift Cards",
      type: "email",
      technique: "Business email compromise or impersonation",
      persuasion: ["Authority", "Urgency", "Secrecy", "Helpfulness"],
      context: "A student office aide receives an email from the principal's real account asking for gift cards. Gift-card purchases require a purchase order and the principal has never asked the student to buy them.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "Dr. Morgan, Principal",
        fromAddress: "dmorgan@lincoln-hs.example",
        replyTo: "dmorgan@lincoln-hs.example",
        to: "alex@students.lincoln-hs.example",
        date: "12:06 PM",
        subject: "Need a quick favor before the assembly",
        body: [
          "Alex,",
          "I am in a confidential meeting and need six $100 gift cards for visiting speakers. Buy them now, scratch the backs, and email the codes. Do not involve the front office because this is a surprise.",
          "I will reimburse you this afternoon.",
          "Dr. Morgan"
        ],
        link: null
      },
      inspections: [
        I("sender", "Sender details", "identity", "The message comes from the principal's real school address. This is reassuring, but a legitimate account can be compromised.", ["real_principal_account"]),
        I("policy", "Purchase policy", "policy", "School purchases require an approved purchase order and may not be made by students with personal funds.", ["purchase_policy_conflict"]),
        I("request", "Payment pattern", "card", "The request uses gift-card codes, personal payment, secrecy, and a promise of later reimbursement.", ["gift_card_pattern"]),
        I("context", "Known schedule and practice", "history", "The assembly schedule lists no visiting speakers, and the principal normally works through the front office for purchases.", ["context_conflict"])
      ],
      evidence: [
        E("real_principal_account", "The message uses the principal's real account", "This supports the claimed identity but cannot prove that the principal currently controls the account.", "strong", "safe", "sender"),
        E("purchase_policy_conflict", "The request violates school purchase policy", "Independent policy says students should not make this purchase.", "strong", "risk", "policy"),
        E("gift_card_pattern", "The request uses gift cards, secrecy, and personal reimbursement", "The payment method is hard to reverse and designed to avoid normal controls.", "strong", "risk", "request"),
        E("context_conflict", "The event and workflow do not match known school context", "Independent schedule and normal practice do not support the story.", "strong", "risk", "context")
      ],
      bestEvidence: ["purchase_policy_conflict", "gift_card_pattern", "context_conflict"],
      correctAssessment: "uncertain",
      correctAction: "verify",
      rationale: "Even though the message uses the principal's real account, the gift-card request violates policy and conflicts with known context, so the student must verify through the front office or a known number.",
      distractors: [
        "The principal's real email address proves the request is authorized.",
        "Every request involving gift cards is automatically fake, so verification is unnecessary."
      ],
      hints: [
        "A real account can be compromised; compare the request with policy and normal workflow.",
        "Look for instructions that remove oversight or make payment irreversible.",
        "Choose a verification channel outside the email conversation."
      ],
      misconceptionTags: ["Real account proves owner intent", "Authority overrides policy", "Gift cards alone prove attack"],
      competencies: ["identity_verification", "risk_communication", "social_engineering"],
      nearTransferId: "c-deepfake-coach",
      response: {
        prompt: "Choose the first three safe response steps.",
        maxSteps: 3,
        steps: [
          { id: "hold", label: "Do not purchase or send gift-card codes", why: "Prevents an irreversible transaction while authorization is unresolved." },
          { id: "verify", label: "Contact the front office or principal through a known number", why: "Confirms identity and authorization independently." },
          { id: "report", label: "Report the message if the principal did not send it", why: "Allows IT to contain a compromised account and warn others." },
          { id: "reply", label: "Reply to the email and ask whether the request is real", why: "A compromised account can answer the reply." },
          { id: "buy_one", label: "Buy one card as a smaller test", why: "Even a small code is irreversible and does not verify identity."
          }
        ],
        correctOrder: ["hold", "verify", "report"],
        success: "The purchase is paused, authorization is verified through a trusted channel, and a confirmed compromise is reported.",
        failure: "Replying within the same channel or sending a test payment does not independently verify the request."
      },
      consequence: {
        ideal: "The front office confirms that the principal did not send the message. IT contains the account and warns staff and students.",
        unsafe: "The student spends personal funds and sends codes that are redeemed immediately."
      },
      debrief: {
        what: "An ambiguous but high-risk request consistent with business email compromise or principal impersonation.",
        strongest: "The policy conflict, irreversible gift-card pattern, and mismatch with known context require trusted-channel verification.",
        inconclusive: "A real sender address supports identity but does not prove current control; gift cards raise strong concern but verification confirms the incident.",
        next: "Pause the transaction, verify through the front office or saved number, and report a confirmed compromise without blaming the account owner.",
        plain: "The email may come from a real account, but the request breaks school rules and asks for gift cards. Call the office another way before acting."
      }
    })
  );

  /* Parallel diagnostic bank: Pre-assessment */
  scenarios.push(
    S({
      id: "a-pre-lms-notice",
      mission: "recognize",
      assessmentSet: "pre",
      assessmentPair: "school-portal",
      title: "Missing Assignment Lockout",
      type: "email",
      technique: "LMS credential phishing",
      persuasion: ["Fear", "Urgency", "Authority"],
      context: "The student has no missing-assignment warning inside the independently opened LMS.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "Lincoln Learning Portal",
        fromAddress: "alerts@lincoln-lms.example",
        replyTo: "support@lincoln-lms.example",
        to: "alex@students.lincoln-hs.example",
        date: "7:42 AM",
        subject: "Account lockout: missing assignment confirmation",
        body: [
          "Alex, your course access will be suspended today unless you confirm the missing assignment notice.",
          "Sign in below to prevent removal from your classes."
        ],
        link: { text: "Confirm assignment", url: "https://lincoln-lms.example/login" }
      },
      inspections: [
        I("sender", "Sender details", "identity", "The message uses lincoln-lms.example, not the school's lincoln-hs.example domain.", ["pre_lms_domain"]),
        I("link", "Link preview", "link", "The link leads to an off-domain login form.", ["pre_lms_link"]),
        I("portal", "Official LMS check", "history", "The official LMS shows no lockout or missing-assignment confirmation request.", ["pre_lms_conflict"]),
        I("language", "Message language", "message", "The message threatens same-day removal from classes.", ["pre_lms_urgency"])
      ],
      evidence: [
        E("pre_lms_domain", "The sender is outside the school domain", "The claimed school identity and registered domain do not match.", "strong", "risk", "sender"),
        E("pre_lms_link", "The login form is outside the school domain", "The page could collect school credentials.", "strong", "risk", "link"),
        E("pre_lms_conflict", "The official LMS has no matching notice", "An independent trusted source contradicts the email.", "strong", "risk", "portal"),
        E("pre_lms_urgency", "The message threatens same-day class removal", "Urgency is supporting evidence, not proof alone.", "moderate", "risk", "language")
      ],
      bestEvidence: ["pre_lms_domain", "pre_lms_link", "pre_lms_conflict"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "The off-domain sender and login page are contradicted by the official LMS, indicating credential phishing.",
      distractors: ["Any message about assignments is malicious.", "The message uses the school name, so it is legitimate."],
      hints: [],
      misconceptionTags: ["School name equals identity", "Urgency as proof"],
      competencies: ["social_engineering", "domain_analysis", "identity_verification"],
      consequence: { ideal: "The lure is reported before credentials are entered.", unsafe: "The attacker captures the school password." },
      debrief: {
        what: "A fake LMS lockout notice designed to steal a school password.",
        strongest: "The off-domain identity and link plus the official-LMS conflict are decisive.",
        inconclusive: "Urgent academic language raises concern but is not proof alone.",
        next: "Report the email and use the independently opened LMS.",
        plain: "The email uses the wrong site and the real LMS has no warning. Report it."
      }
    }),

    S({
      id: "a-pre-delivery-text",
      mission: "verify",
      assessmentSet: "pre",
      assessmentPair: "expected-receipt",
      title: "Expected Package Delivery Text",
      type: "text",
      technique: "Legitimate delivery notification",
      persuasion: ["Convenience"],
      context: "Alex enabled text alerts in the carrier app for a package scheduled to arrive today.",
      artifact: {
        kind: "text",
        app: "Messages",
        sender: "28777",
        contactLabel: "Carrier Alerts",
        time: "1:18 PM",
        message: "Package 1Z9X••• was delivered at 1:16 PM to the front porch. View the photo in your carrier app.",
        link: null
      },
      inspections: [
        I("sender", "Sender record", "phone", "The short code matches the number shown in the carrier app notification settings.", ["pre_delivery_sender"]),
        I("context", "Shipment record", "history", "The independently opened app shows the same tracking suffix and delivery time.", ["pre_delivery_match"]),
        I("request", "Requested action", "shield", "The text asks the user to view details inside the app and requests no payment or credentials.", ["pre_delivery_scope"])
      ],
      evidence: [
        E("pre_delivery_sender", "The short code matches the saved notification source", "The sender can be independently verified.", "strong", "safe", "sender"),
        E("pre_delivery_match", "The tracking and time match the carrier app", "Independent transaction context supports legitimacy.", "strong", "safe", "context"),
        E("pre_delivery_scope", "The text requests no sensitive information", "The workflow directs the user to the app rather than an external form.", "strong", "safe", "request")
      ],
      bestEvidence: ["pre_delivery_sender", "pre_delivery_match", "pre_delivery_scope"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The sender, tracking record, and delivery time match the independently opened carrier app, with no external credential or payment request.",
      distractors: ["Delivery texts are always legitimate when they include a tracking suffix.", "All text alerts are suspicious because phone numbers can be spoofed."],
      hints: [],
      misconceptionTags: ["Tracking detail proves identity", "All texts are suspicious"],
      competencies: ["identity_verification"],
      consequence: { ideal: "Alex checks the verified carrier app normally.", unsafe: "A false positive causes unnecessary concern." },
      debrief: {
        what: "A legitimate delivery notice tied to an expected shipment and verified app record.",
        strongest: "The independently matching sender, tracking suffix, and delivery time support proceeding.",
        inconclusive: "A tracking number by itself can be copied.",
        next: "Use the carrier app for details.",
        plain: "The text matches the delivery in the real app. It is reasonable to proceed."
      }
    }),

    S({
      id: "a-pre-mfa-push",
      mission: "protect",
      assessmentSet: "pre",
      assessmentPair: "connected-app",
      title: "Unexpected Account Approval",
      type: "login",
      technique: "MFA fatigue",
      persuasion: ["Annoyance", "Urgency"],
      context: "The student is not signing in when the approval prompt appears.",
      artifact: {
        kind: "login",
        app: "Authenticator",
        service: "School Account",
        heading: "Approve sign-in?",
        summary: "Windows · Chrome · Chicago, Illinois",
        events: [
          { time: "9:01 PM", source: "Windows · Chrome", detail: "Chicago, IL", status: "Pending" },
          { time: "8:59 PM", source: "Windows · Chrome", detail: "Chicago, IL", status: "Denied" },
          { time: "8:57 PM", source: "Windows · Chrome", detail: "Chicago, IL", status: "Denied" }
        ]
      },
      inspections: [
        I("activity", "Prompt context", "activity", "The student did not initiate any sign-in.", ["pre_mfa_unrequested"]),
        I("device", "Device details", "device", "The request comes from an unfamiliar Windows device.", ["pre_mfa_device"]),
        I("policy", "Security guidance", "policy", "School guidance says to deny and report unexpected prompts, then change the password and review sessions.", ["pre_mfa_policy"])
      ],
      evidence: [
        E("pre_mfa_unrequested", "The student did not initiate the sign-in", "This is direct evidence that the request should not be approved.", "strong", "risk", "activity"),
        E("pre_mfa_device", "The device is unfamiliar", "The source does not match the student's activity.", "strong", "risk", "device"),
        E("pre_mfa_policy", "The known response process says deny and report", "The policy supplies an independent defensive action.", "strong", "safe", "policy")
      ],
      bestEvidence: ["pre_mfa_unrequested", "pre_mfa_device", "pre_mfa_policy"],
      correctAssessment: "malicious",
      correctAction: "escalate",
      rationale: "An unrequested sign-in from an unfamiliar device indicates an active account attack and should be denied and escalated.",
      distractors: ["Approve once to stop the prompts.", "The location alone proves the exact identity of the attacker."],
      hints: [],
      misconceptionTags: ["Approve to stop prompts", "Location alone as proof"],
      competencies: ["authentication", "incident_response"],
      response: {
        prompt: "Choose the first three protective steps.",
        maxSteps: 3,
        steps: [
          { id: "deny", label: "Deny the request", why: "Stops the current approval." },
          { id: "report", label: "Report to school IT", why: "Coordinates investigation." },
          { id: "secure", label: "Change the password and review sessions", why: "Addresses possible credential exposure." },
          { id: "approve", label: "Approve the request", why: "Grants access." }
        ],
        correctOrder: ["deny", "report", "secure"],
        success: "The active request is denied and the account is secured.",
        failure: "Approval can grant the attacker access."
      },
      consequence: { ideal: "The prompt is denied and the account is secured.", unsafe: "The attacker receives access." },
      debrief: {
        what: "An unexpected MFA approval attempt.",
        strongest: "The unrequested sign-in and unfamiliar device are decisive.",
        inconclusive: "Location helps but is not sufficient alone.",
        next: "Deny, report, change the password, and review sessions.",
        plain: "Alex did not start this sign-in. Deny it and report it."
      }
    }),

    S({
      id: "a-pre-friend-share",
      mission: "investigate",
      assessmentSet: "pre",
      assessmentPair: "trusted-account",
      title: "Friend Sends an Unexpected Video Link",
      type: "dm",
      technique: "Potential compromised social account",
      persuasion: ["Familiarity", "Curiosity"],
      context: "A close friend's real account sends “is this you?” with a link, but the wording is unlike the friend and there is no earlier conversation.",
      artifact: {
        kind: "dm",
        app: "Social Messages",
        platform: "Direct Message",
        profileName: "Jordan",
        handle: "@jordanlee",
        status: "Existing friend",
        time: "10:33 PM",
        message: "is this you in this video?? lol",
        link: { text: "watch-now.example/v/4182", url: "https://watch-now.example/v/4182" }
      },
      inspections: [
        I("profile", "Account relationship", "identity", "The message comes from the friend's real existing account.", ["pre_friend_real_account"]),
        I("link", "Destination preview", "link", "The destination is watch-now.example and presents a social-account login form.", ["pre_friend_login_lure"]),
        I("history", "Conversation pattern", "history", "The wording and lack of context differ from the friend's normal messages.", ["pre_friend_context"])
      ],
      evidence: [
        E("pre_friend_real_account", "The account is a real friend account", "This supports familiarity but a real account can be compromised.", "strong", "safe", "profile"),
        E("pre_friend_login_lure", "The external page asks for social credentials", "The destination is unrelated to the social platform.", "strong", "risk", "link"),
        E("pre_friend_context", "The message pattern is unusual", "Behavioral mismatch supports independent verification.", "moderate", "risk", "history")
      ],
      bestEvidence: ["pre_friend_real_account", "pre_friend_login_lure", "pre_friend_context"],
      correctAssessment: "uncertain",
      correctAction: "verify",
      rationale: "The message comes from a real friend account but leads to an unrelated login page and does not match normal behavior, so the friend should be contacted another way.",
      distractors: ["A real friend account guarantees the link is safe.", "Unusual wording proves the friend is using AI."],
      hints: [],
      misconceptionTags: ["Real account proves owner intent", "Behavioral mismatch proves AI"],
      competencies: ["identity_verification", "domain_analysis", "evidence_analysis"],
      consequence: { ideal: "Alex contacts Jordan by phone and learns the account was compromised.", unsafe: "Alex enters credentials and the attack spreads." },
      debrief: {
        what: "An ambiguous message from a real account that is likely compromised.",
        strongest: "The unrelated login destination and behavioral mismatch override familiarity and require verification.",
        inconclusive: "The real account does not prove current owner intent.",
        next: "Contact the friend through a saved number and report the link if compromise is confirmed.",
        plain: "The account is real, but the link and message are suspicious. Ask Jordan another way."
      }
    }),

    S({
      id: "a-pre-lunch-qr",
      mission: "respond",
      assessmentSet: "pre",
      assessmentPair: "public-qr",
      title: "School Lunch Menu QR Code",
      type: "qr",
      technique: "Legitimate public-information QR code",
      persuasion: ["Convenience"],
      context: "The code is printed directly on the cafeteria menu board and matches the code on the school nutrition webpage.",
      artifact: {
        kind: "qr",
        app: "Cafeteria Sign",
        posterTitle: "This Week's Lunch Menu",
        copy: "Scan for ingredients, allergen information, and nutrition details.",
        organizer: "Lincoln High Nutrition Services",
        footer: "No login required",
        encodedUrl: "https://nutrition.lincoln-hs.example/menu"
      },
      inspections: [
        I("qr", "QR destination", "qr", "The code resolves to nutrition.lincoln-hs.example/menu.", ["pre_qr_domain"]),
        I("official", "Official webpage", "history", "The nutrition webpage displays the same code and destination.", ["pre_qr_match"]),
        I("request", "Requested information", "shield", "The page displays public menu information and asks for no login or personal data.", ["pre_qr_scope"])
      ],
      evidence: [
        E("pre_qr_domain", "The destination uses the school nutrition subdomain", "The organization and registered domain match.", "strong", "safe", "qr"),
        E("pre_qr_match", "The code matches an independent official webpage", "A separate school source confirms it.", "strong", "safe", "official"),
        E("pre_qr_scope", "The page provides public information without data collection", "The request matches the purpose.", "strong", "safe", "request")
      ],
      bestEvidence: ["pre_qr_domain", "pre_qr_match", "pre_qr_scope"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The school-domain destination matches the official nutrition webpage and provides public information without requesting personal data.",
      distractors: ["QR codes in public places are always safe.", "All QR codes should be reported because the destination is hidden."],
      hints: [],
      misconceptionTags: ["Physical location guarantees safety", "All QR codes are malicious"],
      competencies: ["domain_analysis", "data_protection"],
      consequence: { ideal: "The student checks the verified menu normally.", unsafe: "A false positive blocks access to useful public information." },
      debrief: {
        what: "A legitimate public-information QR code.",
        strongest: "The school-domain destination, independent match, and minimal data scope support proceeding.",
        inconclusive: "The cafeteria location alone is not proof.",
        next: "Preview the destination and use it normally.",
        plain: "The code matches the real school nutrition page and asks for no private data. It is safe to use."
      }
    })
  );

  /* Parallel diagnostic bank: Post-assessment */
  scenarios.push(
    S({
      id: "a-post-school-portal",
      mission: "recognize",
      assessmentSet: "post",
      assessmentPair: "school-portal",
      title: "Course Registration Verification",
      type: "email",
      technique: "School-portal credential phishing",
      persuasion: ["Authority", "Urgency", "Fear"],
      context: "Course registration is next month, and the official student portal shows no verification request.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "Lincoln Student Services",
        fromAddress: "registration@lincoln-student.example",
        replyTo: "verify@lincoln-student.example",
        to: "alex@students.lincoln-hs.example",
        date: "2:24 PM",
        subject: "Verify account to keep next semester schedule",
        body: [
          "Your course schedule will be released unless your student login is verified before 5:00 PM.",
          "Use the portal link below to keep your selected classes."
        ],
        link: { text: "Keep my schedule", url: "https://lincoln-student.example/portal" }
      },
      inspections: [
        I("sender", "Sender details", "identity", "The sender uses lincoln-student.example instead of the school domain.", ["post_portal_domain"]),
        I("link", "Link preview", "link", "The login page remains on the unrelated example domain.", ["post_portal_link"]),
        I("portal", "Official portal check", "history", "The independently opened portal has no matching notice and registration has not opened.", ["post_portal_conflict"]),
        I("language", "Message language", "message", "The message threatens loss of classes under a short deadline.", ["post_portal_pressure"])
      ],
      evidence: [
        E("post_portal_domain", "The sender is outside the school domain", "The claimed identity and registered domain do not match.", "strong", "risk", "sender"),
        E("post_portal_link", "The login form is outside the school domain", "The page could collect school credentials.", "strong", "risk", "link"),
        E("post_portal_conflict", "The real portal contradicts the message", "An independent trusted source shows no verification requirement.", "strong", "risk", "portal"),
        E("post_portal_pressure", "The message threatens schedule loss", "The pressure is supporting evidence rather than proof alone.", "moderate", "risk", "language")
      ],
      bestEvidence: ["post_portal_domain", "post_portal_link", "post_portal_conflict"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "The off-domain sender and login page are contradicted by the official student portal, indicating credential phishing.",
      distractors: ["All registration messages are malicious.", "The message is safe because it refers to real school scheduling."],
      hints: [],
      misconceptionTags: ["Relevant school topic equals legitimacy", "Urgency as proof"],
      competencies: ["social_engineering", "domain_analysis", "identity_verification"],
      consequence: { ideal: "The lure is reported before credentials are entered.", unsafe: "The attacker captures the student login." },
      debrief: {
        what: "A fake registration message designed to steal school credentials.",
        strongest: "The off-domain identity and destination plus the official-portal conflict are decisive.",
        inconclusive: "A real school topic and deadline can make a lure believable without making it legitimate.",
        next: "Report the email and use the independently opened student portal.",
        plain: "The email uses the wrong website and the real portal has no warning. Report it."
      }
    }),

    S({
      id: "a-post-club-receipt",
      mission: "verify",
      assessmentSet: "post",
      assessmentPair: "expected-receipt",
      title: "Expected Club Registration Receipt",
      type: "email",
      technique: "Legitimate school transaction notice",
      persuasion: ["Familiarity"],
      context: "Alex registered for the coding club through the school activities portal two minutes before the receipt arrived.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "Lincoln Activities",
        fromAddress: "activities@lincoln-hs.example",
        replyTo: "activities@lincoln-hs.example",
        to: "alex@students.lincoln-hs.example",
        date: "3:40 PM",
        subject: "Coding Club registration confirmed",
        body: [
          "Hi Alex,",
          "Your Coding Club registration is confirmed for Wednesdays in Room 214.",
          "No payment is due. You can review activities from the school portal."
        ],
        link: { text: "View activities", url: "https://activities.lincoln-hs.example/student" }
      },
      inspections: [
        I("sender", "Sender details", "identity", "The sender and reply address use the school domain.", ["post_receipt_sender"]),
        I("context", "Registration record", "history", "The activity, room, and time match the registration Alex just completed.", ["post_receipt_match"]),
        I("link", "Link preview", "link", "The destination uses the school's activities subdomain.", ["post_receipt_link"]),
        I("request", "Requested information", "shield", "No payment, password, or private data is requested.", ["post_receipt_scope"])
      ],
      evidence: [
        E("post_receipt_sender", "The sender uses the school domain", "The claimed organization and sender address match.", "strong", "safe", "sender"),
        E("post_receipt_match", "The receipt matches a student-initiated registration", "Independent recent context supports legitimacy.", "strong", "safe", "context"),
        E("post_receipt_link", "The destination stays on the school domain", "The registered domain matches the service.", "strong", "safe", "link"),
        E("post_receipt_scope", "No sensitive information is requested", "The message fits a confirmation workflow.", "moderate", "safe", "request")
      ],
      bestEvidence: ["post_receipt_sender", "post_receipt_match", "post_receipt_link"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The school-domain receipt and destination match a registration Alex just completed and request no additional sensitive information.",
      distractors: ["All school club emails are legitimate.", "A receipt is safe because it does not contain a payment button."],
      hints: [],
      misconceptionTags: ["School theme equals legitimacy", "No payment button equals safe"],
      competencies: ["identity_verification", "domain_analysis"],
      consequence: { ideal: "Alex keeps the verified confirmation and attends the club.", unsafe: "A false positive causes unnecessary confusion." },
      debrief: {
        what: "A legitimate school activity confirmation.",
        strongest: "The expected registration, school identity, and school destination support proceeding.",
        inconclusive: "A school theme or receipt layout is weak evidence alone.",
        next: "Proceed normally or review the activity from the independently opened school portal.",
        plain: "The email matches the club registration Alex just completed on the real school site."
      }
    }),

    S({
      id: "a-post-connected-app",
      mission: "protect",
      assessmentSet: "post",
      assessmentPair: "connected-app",
      title: "Homework Helper Requests Mail Control",
      type: "oauth",
      technique: "OAuth consent phishing",
      persuasion: ["Convenience", "Authority"],
      context: "A browser extension claims it can organize homework by reading school email and automatically messaging teachers.",
      artifact: {
        kind: "oauth",
        app: "Account Authorization",
        service: "School Account",
        appName: "Homework Flow AI",
        publisher: "Publisher not verified",
        account: "alex@students.lincoln-hs.example",
        permissions: [
          "Read all email",
          "Send email as you",
          "Read contacts",
          "Maintain access indefinitely"
        ],
        redirectHost: "homework-flow-access.example"
      },
      inspections: [
        I("publisher", "Publisher identity", "identity", "The publisher is unverified and uses an unrelated example domain.", ["post_oauth_publisher"]),
        I("permissions", "Permission scope", "key", "The app can read and send all mail, read contacts, and retain access.", ["post_oauth_scope"]),
        I("purpose", "Purpose comparison", "scale", "A homework organizer does not need to send mail as the student or read every contact.", ["post_oauth_mismatch"]),
        I("policy", "Approved-app catalog", "policy", "The app is not listed in the school's approved catalog.", ["post_oauth_policy"])
      ],
      evidence: [
        E("post_oauth_publisher", "The publisher cannot be verified", "The requesting identity is unsupported.", "strong", "risk", "publisher"),
        E("post_oauth_scope", "The app requests broad persistent control", "The access could support surveillance and impersonation.", "strong", "risk", "permissions"),
        E("post_oauth_mismatch", "The permissions exceed the stated purpose", "The request violates least privilege.", "strong", "risk", "purpose"),
        E("post_oauth_policy", "The app is not approved by the school", "An independent control conflicts with the request.", "strong", "risk", "policy")
      ],
      bestEvidence: ["post_oauth_scope", "post_oauth_mismatch", "post_oauth_policy"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "An unverified, unapproved app requests persistent mail and contact access far beyond its homework-organizing purpose.",
      distractors: ["Every browser extension is malicious.", "The authorization screen is real, so the requesting app must be safe."],
      hints: [],
      misconceptionTags: ["Real authorization screen equals safe app", "All extensions are malicious"],
      competencies: ["authentication", "data_protection", "defensive_controls"],
      consequence: { ideal: "The request is denied and reported.", unsafe: "The app gains persistent access to messages and contacts." },
      debrief: {
        what: "An unsafe OAuth request seeking account control without directly asking for a password.",
        strongest: "The broad permissions, purpose mismatch, and policy conflict are decisive.",
        inconclusive: "A real authorization screen proves the platform page is real, not that the app is trustworthy.",
        next: "Deny and report the app.",
        plain: "The app asks for much more account access than it needs. Deny and report it."
      }
    }),

    S({
      id: "a-post-team-chat",
      mission: "investigate",
      assessmentSet: "post",
      assessmentPair: "trusted-account",
      title: "Teammate Account Shares a Voting Link",
      type: "dm",
      technique: "Potential compromised social account",
      persuasion: ["Familiarity", "Helpfulness", "Urgency"],
      context: "A teammate's real account asks Alex to vote for a competition entry, but the team has never discussed the event.",
      artifact: {
        kind: "dm",
        app: "Team Chat",
        platform: "Direct Message",
        profileName: "Morgan K.",
        handle: "@morgan_k",
        status: "Existing teammate",
        time: "8:56 PM",
        message: "Can you vote for our team right now? I need 3 more votes before the round closes.",
        link: { text: "team-vote.example/login", url: "https://team-vote.example/login" }
      },
      inspections: [
        I("profile", "Account relationship", "identity", "The account belongs to a real teammate, but current control is not independently verified.", ["post_team_real_account"]),
        I("link", "Destination preview", "link", "The external voting page asks for the student's team-chat username and password.", ["post_team_login_lure"]),
        I("context", "Competition record", "history", "The team calendar and public competition page show no active voting round.", ["post_team_conflict"]),
        I("pattern", "Message pattern", "activity", "Several teammates received the same message within one minute.", ["post_team_bulk"])
      ],
      evidence: [
        E("post_team_real_account", "The message uses a real teammate account", "This creates familiarity but does not prove current control.", "strong", "safe", "profile"),
        E("post_team_login_lure", "The voting site collects unrelated chat credentials", "The destination has no reason to request the team-chat password.", "strong", "risk", "link"),
        E("post_team_conflict", "No matching voting round exists", "Independent public and team records contradict the request.", "strong", "risk", "context"),
        E("post_team_bulk", "The same message reached many teammates rapidly", "The pattern is consistent with automated account abuse.", "strong", "risk", "pattern")
      ],
      bestEvidence: ["post_team_login_lure", "post_team_conflict", "post_team_bulk"],
      correctAssessment: "uncertain",
      correctAction: "verify",
      rationale: "A real account sends an off-context link that collects unrelated credentials and appears in a rapid bulk pattern, so the teammate should be contacted through another channel.",
      distractors: ["A real teammate account guarantees the link is safe.", "Any request for a vote is automatically a scam."],
      hints: [],
      misconceptionTags: ["Real account proves owner intent", "All voting requests are malicious"],
      competencies: ["identity_verification", "domain_analysis", "evidence_analysis"],
      consequence: { ideal: "Alex calls Morgan and confirms the account was compromised.", unsafe: "The team-chat password is stolen and the campaign spreads." },
      debrief: {
        what: "A likely campaign sent through a compromised teammate account.",
        strongest: "The unrelated credential request, absent competition, and bulk pattern justify trusted-channel verification.",
        inconclusive: "The real account creates familiarity but does not establish current control.",
        next: "Contact the teammate another way and report the campaign if compromise is confirmed.",
        plain: "The account is real, but the link and team records do not match. Contact Morgan another way."
      }
    }),

    S({
      id: "a-post-library-qr",
      mission: "respond",
      assessmentSet: "post",
      assessmentPair: "public-qr",
      title: "Library Workshop QR Registration",
      type: "qr",
      technique: "Legitimate public-event QR code",
      persuasion: ["Opportunity"],
      context: "The QR code is printed as part of the library's official event flyer and matches the registration link on the library website.",
      artifact: {
        kind: "qr",
        app: "Library Flyer",
        posterTitle: "Build Your First Website",
        copy: "Free Saturday workshop for grades 9–12. Registration requires a name and contact email.",
        organizer: "Lincoln Public Library",
        footer: "No payment or school login required",
        encodedUrl: "https://events.lincoln-library.example/web-workshop"
      },
      inspections: [
        I("qr", "QR destination", "qr", "The code resolves to events.lincoln-library.example/web-workshop.", ["post_qr_domain"]),
        I("official", "Library event page", "history", "The independently opened library website lists the same workshop and destination.", ["post_qr_match"]),
        I("request", "Registration fields", "shield", "The form requests only a name and contact email needed for registration; no payment or password is requested.", ["post_qr_scope"])
      ],
      evidence: [
        E("post_qr_domain", "The destination uses the library event domain", "The organization and registered domain match.", "strong", "safe", "qr"),
        E("post_qr_match", "The workshop is confirmed on the official site", "An independent source supports the flyer.", "strong", "safe", "official"),
        E("post_qr_scope", "The form requests limited registration data", "The data is proportional to the event purpose.", "strong", "safe", "request")
      ],
      bestEvidence: ["post_qr_domain", "post_qr_match", "post_qr_scope"],
      correctAssessment: "legitimate",
      correctAction: "proceed",
      rationale: "The library-domain destination matches the official event page and requests only information needed for registration.",
      distractors: ["All library flyers are automatically safe.", "QR codes are too risky for event registration."],
      hints: [],
      misconceptionTags: ["Physical source guarantees safety", "All QR codes are malicious"],
      competencies: ["domain_analysis", "data_protection"],
      consequence: { ideal: "The student registers through the verified page.", unsafe: "A false positive prevents use of a legitimate community opportunity." },
      debrief: {
        what: "A legitimate public-library event registration code.",
        strongest: "The library-domain destination, official event confirmation, and limited data request support proceeding.",
        inconclusive: "A printed flyer or QR format is not sufficient by itself.",
        next: "Proceed normally after previewing and verifying the destination.",
        plain: "The code matches the real library event page and asks only for registration details. It is safe to use."
      }
    })
  );


  function attachBranch(scenarioId, branch) {
    const scenario = scenarios.find(function (item) { return item.id === scenarioId; });
    if (scenario) scenario.branch = branch;
  }

  attachBranch("r-school-it-reset", {
    title: "After the Click: Contain the Account",
    intro: "A classmate reports that they opened the reset page and entered their school password before realizing the message was suspicious.",
    startNode: "contain",
    nodes: {
      contain: {
        prompt: "What should happen first?",
        options: [
          { id: "trusted_reset", label: "Open the real school portal independently, report the incident, and begin an approved password reset", feedback: "Correct. This avoids the phishing page, starts containment, and alerts the team that other students may be targeted.", score: 100, next: "mfa" },
          { id: "reuse_link", label: "Return to the email link and enter a new password so the old one no longer works", feedback: "Unsafe. Returning to the phishing page can expose the new password as well.", score: 0, next: "mfa" },
          { id: "wait", label: "Wait to see whether the account behaves differently before reporting", feedback: "Waiting gives an attacker more time to use the password and target other students.", score: 25, next: "mfa" }
        ]
      },
      mfa: {
        prompt: "An unexpected MFA prompt appears from an unfamiliar device while the classmate is resetting access. What is the best response?",
        options: [
          { id: "deny_review", label: "Deny the prompt, notify school IT, revoke active sessions, and review account activity", feedback: "Correct. The prompt is treated as evidence of attempted access and the response addresses both credentials and active sessions.", score: 100, next: null },
          { id: "approve_stop", label: "Approve the prompt so the repeated notifications stop", feedback: "Unsafe. Approval may complete the attacker's sign-in.", score: 0, next: null },
          { id: "ignore_only", label: "Ignore the prompt but take no other action", feedback: "Ignoring avoids approval, but it does not contain the exposed password or existing sessions.", score: 45, next: null }
        ]
      }
    }
  });

  attachBranch("i-compromised-school-account", {
    title: "After the Click: Recover a Compromised Account",
    intro: "The account activity confirms compromise. The student is now on a trusted school device and needs help recovering access safely.",
    startNode: "contain",
    nodes: {
      contain: {
        prompt: "Which first move best limits additional harm while preserving useful evidence?",
        options: [
          { id: "trusted_it", label: "Contact school IT through the directory, contain the account, and preserve the sign-in and mail records", feedback: "Correct. The response uses a trusted channel, reduces attacker access, and keeps evidence available.", score: 100, next: "recover" },
          { id: "delete_mail", label: "Delete the suspicious sent messages and continue using the account", feedback: "Deleting a few messages does not remove active sessions, forwarding rules, or application access.", score: 20, next: "recover" },
          { id: "contact_attacker", label: "Email the forwarding address and demand that the attacker stop", feedback: "This does not contain access and may reveal more information to the attacker.", score: 0, next: "recover" }
        ]
      },
      recover: {
        prompt: "After identity is verified, which recovery set is most complete?",
        options: [
          { id: "full_recovery", label: "Reset credentials, restore MFA, revoke sessions and app tokens, remove the forwarding rule, and review affected messages", feedback: "Correct. Recovery addresses every persistence mechanism shown in the evidence.", score: 100, next: null },
          { id: "password_only", label: "Change only the password and assume every other setting will update automatically", feedback: "Incomplete. Existing sessions, OAuth tokens, forwarding rules, or replaced MFA may survive a password change.", score: 45, next: null },
          { id: "erase_logs", label: "Erase all activity records before restoring access", feedback: "Unsafe. Destroying logs weakens investigation, notification, and future prevention.", score: 0, next: null }
        ]
      }
    }
  });

  attachBranch("c-deepfake-coach", {
    title: "Trusted Verification and Team Communication",
    intro: "The familiar voice and displayed caller name are not sufficient proof. The team captain must verify the request and communicate the result responsibly.",
    startNode: "verify",
    nodes: {
      verify: {
        prompt: "Which verification method is strongest?",
        options: [
          { id: "saved_number", label: "Call the coach using the saved team-directory number and check the official trip schedule", feedback: "Correct. Both sources are independent of the suspicious voicemail.", score: 100, next: "communicate" },
          { id: "reply_number", label: "Text the number that left the voicemail and ask whether it is really the coach", feedback: "Weak verification. The same attacker can answer the suspicious channel.", score: 15, next: "communicate" },
          { id: "voice_vote", label: "Ask teammates whether the voice sounds convincing and follow the majority", feedback: "Voice similarity and group opinion do not establish identity.", score: 35, next: "communicate" }
        ]
      },
      communicate: {
        prompt: "The coach confirms that the voicemail was fake. What should the captain send to the team?",
        options: [
          { id: "factual_notice", label: "A factual, non-blaming alert with the verified coach number, a reminder not to buy gift cards, and reporting instructions", feedback: "Correct. The message reduces harm, gives a trusted alternative, and avoids public accusation.", score: 100, next: null },
          { id: "public_audio", label: "Post the audio publicly and accuse a specific student of creating it", feedback: "Unsafe. Public accusation can cause harm and is not supported by the available evidence.", score: 10, next: null },
          { id: "silent", label: "Say nothing because the captain did not lose money", feedback: "The attack may still target other team members, so a clear warning is appropriate.", score: 25, next: null }
        ]
      }
    }
  });

  window.SPOOF_DETECTIVE_DATA = {
    version: VERSION,
    missions: MISSIONS,
    competencies: COMPETENCIES,
    badges: BADGES,
    actions: ACTIONS,
    assessments: ASSESSMENTS,
    missionStandards: MISSION_STANDARDS,
    scenarios: scenarios
  };
})();
