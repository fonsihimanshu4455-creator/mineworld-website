import { PageHeader } from "../Dashboard";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
import { teamRoles } from "../../../data/teamRoles";

const MEMBER_FIELDS = [
  { name: "avatar", type: "image", label: "Avatar (square)" },
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
        subtitle="People featured on the team section. Square avatars work best — they're cropped to circles in some surfaces."
      />
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
    </div>
  );
}
