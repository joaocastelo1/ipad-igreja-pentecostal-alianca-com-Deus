import { SocialIcon } from "@/components/ui/SocialIcon";
import { socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";

const platformNames = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
} as const;

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
  showLabels?: boolean;
};

export function SocialLinks({
  className,
  iconClassName,
  showLabels = false,
}: SocialLinksProps) {
  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {socialLinks.map((link) => (
        <li key={link.platform}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={cn(
              "icon-button",
              showLabels && "w-auto gap-2 px-4",
              iconClassName,
            )}
          >
            <SocialIcon
              platform={link.platform}
              className="h-[18px] w-[18px]"
            />
            {showLabels ? (
              <span className="text-xs font-semibold">
                {platformNames[link.platform]}
              </span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
