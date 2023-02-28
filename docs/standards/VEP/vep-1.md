---
title: "VEP-1: VEP Purpose and Guidelines"
---

```preamble
VEP: 1
author: VenomBlockchain <git@venom.email>
status: Review
type: Informational
created: 2023-02-28
```

## What is a VEP?

VEP stands for "Venom Enhancement Proposal." It is a process for submitting proposals for changes and improvements to the Venom blockchain protocol, similar to the Ethereum Improvement Proposal (EIP) process.

The VEP process is used by members of the Venom community, including developers, researchers, and other stakeholders, to propose changes to the Venom blockchain protocol. These proposals can cover a wide range of topics, such as changes to the consensus mechanism, improvements to smart contract functionality, and updates to the network's governance structure.

## VEP Rationale

The rationale behind the Venom Enhancement Proposal (VEP) process is to provide a standardized and transparent way for members of the Venom community to propose changes and improvements to the Venom blockchain protocol.

By using a structured format for proposals, community members can more easily understand the purpose and scope of each proposed change and can provide feedback and suggestions for improvement in a clear and organized manner. This helps to ensure that proposed changes are thoroughly evaluated and discussed by the community before they are implemented, reducing the risk of introducing bugs or unintended consequences into the network.

Additionally, the VEP process helps to decentralize the decision-making process around changes to the Venom protocol. Instead of relying solely on the Venom development team to determine which changes to implement, the VEP process allows the community to have a say in the direction of the network. This helps to ensure that the Venom protocol remains responsive to the needs of its users and stakeholders.

## VEP Types

Several types of Venom Enhancement Proposals (VEPs) can be proposed, depending on the scope and nature of the proposed change. The available VEP types are:

* **Standards Track VEP** describes any change that affects most or all Venom implementations. Standards Track VEPs can be broken down into the following categories:
   1. **Core VEPs** that propose changes to the core protocol of the Venom blockchain, such as changes to the consensus algorithm or the block validation rules.
   2. **Networking VEPs** that propose changes to the network layer of the Venom blockchain, such as changes to the peer-to-peer networking protocol or the data propagation mechanisms.
   3. **Interface VEPs** that propose changes to user interfaces or APIs that interact with the Venom blockchain, such as changes to wallet software or developer tools.
   4. **Contract VEPs** that propose changes to the smart contract functionality of the Venom blockchain, such as changes to the scripting language or the virtual machine.
* **Informational VEP** describes a Venom design issue, or provides general guidelines or information to the Venom community, but does not propose a new feature.
* **Process VEP** that proposes changes to the VEP process itself, such as changes to the proposal format or the community review process.

By categorizing proposals into these types, the Venom community can more easily understand the scope and purpose of each proposal and can provide more targeted feedback and suggestions for improvement. This helps to ensure that proposed changes are evaluated in a consistent and organized manner and that the resulting updates are well-documented and transparent.

## VEP Process

Here are the common steps involved in the Venom Enhancement Proposal (VEP) process:

1. Idea: Anyone can propose an idea for a change or improvement to the Venom blockchain protocol. This could be an individual or a group of individuals, and the idea could be related to any aspect of the protocol such as consensus, governance, smart contracts, or user experience.
2. Draft proposal: Once an idea has been generated, the proposer should draft a proposal that outlines the details of the proposed change or improvement. The proposal should include a description of the problem the proposal aims to solve, the proposed solution, and any relevant technical details such as changes to the codebase.
3. Submit for review: Once the proposal is drafted, it should be submitted for review by the Venom community. This can be done by creating a Github pull request to the corresponding section of this documentation.
4. Feedback and revisions: Once the proposal has been submitted for review, the Venom community will provide feedback and suggestions for improvement. The proposer may need to revise the proposal based on this feedback.
5. Community discussion: The proposal should be discussed and debated by the Venom community, including developers, users, and other stakeholders. This discussion should take place transparently and openly, allowing for different viewpoints to be expressed and considered.
6. Proposal acceptance: If the proposal is deemed to be beneficial to the Venom network, it may be accepted by the community. This typically involves a community vote or signaling process, where stakeholders in the network can signal their support for the proposal.

By following this process, the Venom community can collaboratively propose, review, and implement changes and improvements to the network's protocol in a transparent and decentralized manner. This helps to ensure that the Venom network remains adaptable, resilient, and responsive to the needs of its users and stakeholders.

## What belongs in a successful VEP?

Each VEP should have the following parts:

1. Title: The VEP title is a few words, not a complete sentence. It should be clear and descriptive. It should be placed in a "front-matter" section at the top of the document, formatted as a YAML block with a single field `title`.
2. Preamble: This is a standard header that includes some information about the proposal, the author's name, and the date of submission. See [below](#vep-header-preamble) for details.
3. Abstract: A brief summary of the proposal that provides an overview of what the proposal aims to accomplish and its significance.
4. Motivation (optional): This section explains why the proposal is needed and what problems it aims to solve. It can include real-world examples, user stories, and other supporting evidence.
5. Specification: This section provides a detailed description of the proposed technical changes or enhancements, including any modifications to the existing codebase or protocol. It should be as specific and precise as possible so that developers can easily understand and implement the proposed changes.
6. Rationale: This section explains the reasoning behind the proposal, including any benefits and drawbacks of the proposed changes. It should also consider any potential impact on the Venom network as a whole, and any trade-offs that need to be made.
7. Backwards compatibility (optional): If the proposal involves changes to existing protocols or standards, this section should explain how it maintains compatibility with older versions of the protocol. It can also include a discussion of how older versions will be deprecated and phased out.
8. Test cases (optional): This section includes a set of test cases that can be used to verify the proposed changes. These tests should cover a range of scenarios and edge cases to ensure that the proposed changes are robust and reliable.
9. Reference implementation (optional): If the proposal includes changes to the codebase, this section can include a reference implementation that demonstrates how the proposed changes can be implemented in practice.
10. Security considerations: This section outlines any potential security risks or vulnerabilities that may arise as a result of the proposed changes. It should also provide recommendations for mitigating these risks and ensuring the security of the Venom network.
11. Copyright: This section indicates that the proposal is released under the Creative Commons Zero (CC0) license, which allows anyone to use, modify, and distribute the proposal without restriction.

By including these components in a VEP, proposers can provide a clear and detailed proposal that is well-structured, easy to understand, and thorough in its coverage of technical, social, and security considerations. This can help to increase the chances of the proposal being accepted and implemented by the Venom community.

## VEP Formats and Templates

VEPs should be written in [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) format. There is a [template](#what-is-a-vep) to follow.

## VEP Header Preamble

VEP Header Preamble is a special block with VEP metadata. It should be placed inside the markdown code block before the first heading. To suppress your markdown lint warnings use the `preamble` as a code block syntax language.

```markdown
    ```preamble
    VEP: 1
    author: VenomBlockchain <git@venom.email>
    status: Review
    type: Informational
    created: 2023-02-28
    ```
```

The headers must appear in the following order:

1. `VEP`: A unique identifier assigned to the proposal. Format: VEP-{number}, where {number} is a three-digit number.
2. `author`: The name and email address of the proposal's author(s). Format: Name &lt;email address>
3. `status`: The current status of the proposal. Format: one of "Draft", "Review", "Final", and "Withdrawn".
4. `type`: The type of the proposal. Format: one of "Standards Track", "Informational", or "Process".
5. `category` (for Standards Track VEPs only): The category of the proposal, if it is a Standards Track VEP. Format: one of "Core", "Networking", "Interface", or "Contract".
6. `created`: The date that the proposal was created. Format: YYYY-MM-DD.
7. `requires`: A list of any other VEPs that need to be implemented for this proposal to be viable. Format: comma-separated list of VEP numbers.
8. `withdrawal-reason`: The reason why the proposal was withdrawn from consideration, if applicable. Format: free text. (optional field for Withdrawn VEPs only)

## Linking to External Resources

Other than the specific exceptions listed below, links to external resources SHOULD NOT be included. External resources may disappear, move, or change unexpectedly.

## Linking to other VEPs

References to other VEPs should follow the format VEP-N where N is the VEP number you are referring to. Each VEP that is referenced in a VEP MUST be accompanied by a relative markdown link the first time it is referenced and MAY be accompanied by a link on subsequent references. The link MUST always be done via relative paths so that the links work in this GitHub repository, forks of this repository, the main VEPs docs site section, mirrors of the main VEP socs site section, etc. For example, you would link to this VEP as ./VEP-1.md.

## Auxiliary Files

Images, diagrams and auxiliary files should be included in a subdirectory of the assets folder for that VEP as follows: assets/VEP-N (where N is to be replaced with the VEP number). When linking to an image in the VEP, use relative links such as ./assets/VEP-1/image.png.

## Style Guide

### Titles

The `title` field in the preamble:

* Should not include the word "standard" or any variation thereof; and
* Should not include the VEP's number.

### Descriptions

The `description` field in the preamble:

* Should not include the word "standard" or any variation thereof; and
* Should not include the VEP's number.

### RFC 2119 and RFC 8174

VEPs are encouraged to follow [RFC 2119](https://www.ietf.org/rfc/rfc2119.html) and [RFC 8174](https://www.ietf.org/rfc/rfc8174.html) for terminology and to insert the following at the beginning of the Specification section:

> The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 and RFC 8174.
