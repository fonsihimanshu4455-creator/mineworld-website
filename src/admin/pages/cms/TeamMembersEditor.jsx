import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
import EditorSection from "../../components/EditorSection";
import { teamRoles } from "../../../data/teamRoles";

const MEMBER_FIELDS = [
  { name: "avatar", type: "image", label: "Avatar (square)", specKey: "team.members.avatar" },
  { name: "name", type: "text", label: "Name" },
  { name: "role", type: "text", label: "Role" },
  { name: "bio", type: "multiline", label: "Bio" },
  { name: "linkedin_url", type: "url", label: "LinkedIn (optional)" },
  { name: "twitter_url", type: "url", label: "Twitter / X (optional)" },
];

export default function TeamMembersEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Team"
        title="Team Members"
        subtitle="Section heading + the team member cards. Square avatars work best — they're cropped to circles in some surfaces."
      />

      <EditorSection title="Section copy">
        <TextEditor
          slotKey="team.eyebrow"
          label="Eyebrow"
          fallback="Team"
        />
        <TextEditor
          slotKey="team.headline"
          label="Headline"
          fallback="A specialist for every layer of the work."
        />
        <TextEditor
          slotKey="team.subhead"
          label="Sub-paragraph"
          multiline
          fallback="Tap any role to see what they own, how they contribute, and the service they lead."
        />
      </EditorSection>

      <EditorSection title="Members" hint="Drag to reorder">
        <CurrentSiteContentPreview
          slotKey="team.members"
          legacyItems={teamRoles}
          describeItem={(m) => `${m.name} — ${m.role || ""}`}
        />
        <RepeatingListEditor
          slotKey="team.members"
          label="Team members"
          itemFields={MEMBER_FIELDS}
          category="team"
          folder="mineworld/team"
        />
      </EditorSection>
    </div>
  );
}
