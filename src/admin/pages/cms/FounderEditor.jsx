import { PageHeader } from "../Dashboard";
import AssetUploader from "../../components/AssetUploader";
import TextEditor from "../../components/TextEditor";
import EditorSection from "../../components/EditorSection";

export default function FounderEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Founder"
        title="Founder Section"
        subtitle="Photo, name, title and bio for the founder block on the home page and About page."
      />

      <EditorSection title="Portrait" hint="4:5 vertical recommended">
        <AssetUploader
          slotKey="founder.photo"
          accept="image"
          category="team"
          folder="mineworld/founder"
          tags={["founder"]}
        />
      </EditorSection>

      <EditorSection title="Identity">
        <TextEditor
          slotKey="founder.name"
          label="Name"
          fallback="Himanshu Bhardwaj"
        />
        <TextEditor
          slotKey="founder.title"
          label="Title"
          fallback="Founder & Creative Director"
        />
        <TextEditor
          slotKey="founder.bio"
          label="Short bio"
          multiline
          fallback="Building Mineworld with an editing-first mindset, premium standards, and a sharp focus on how brands are perceived."
        />
      </EditorSection>
    </div>
  );
}
