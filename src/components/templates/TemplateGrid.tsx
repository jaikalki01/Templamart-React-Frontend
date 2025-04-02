
import { TemplateProps } from "./TemplateCard";
import TemplateCard from "./TemplateCard";

interface TemplateGridProps {
  templates: TemplateProps[];
  title?: string;
  description?: string;
}

const TemplateGrid = ({ templates, title, description }: TemplateGridProps) => {
  return (
    <div className="space-y-6">
      {title && (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default TemplateGrid;
