import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const About = () => {
  return (
    <div className="space-y-3">
      <header className="flex flex-col space-y-1">
        <span className="text-base font-medium text-blue-600">Paid plans</span>
        <span className="text-4xl font-semibold">Key information about</span>
        <span className="text-4xl font-semibold text-blue-600">
          the paid plans
        </span>
      </header>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>Required quantity</CardTitle>
              <CardDescription>
                The number of developers licensed must correspond to the maximum
                number of concurrent developers contributing changes to the
                front-end code of the projects that use the software. You can
                learn more about this in the EULA.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perpetual license model</CardTitle>
              <CardDescription className="py-3">
                The Perpetual license model offers the right to keep using your
                licensed versions forever in production and development. It
                comes with 12 months of maintenance (free updates & support).
              </CardDescription>
              <CardDescription className="pb-3">
                Upon expiration, you can renew your maintenance plan with a
                discount that depends on when you renew:
              </CardDescription>
              <CardDescription className="pl-6">
                before the support expires: 50% discount up to 60 days after the
                support has expired: 35% discount more than 60 days after the
                support has expired: 15% discount
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle className="pb-2">
                Perpetual vs. Annual license model
              </CardTitle>

              <CardDescription className="pb-4">
                On both license models, any version released before the end of
                your license term is forever available for applications deployed
                in production.
              </CardDescription>
              <CardDescription>
                The difference regards the right to use the components for
                development purposes. Only the perpetual license model allows
                you to continue development once your license expires.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="pb-2">Annual license model</CardTitle>
              <CardDescription className="pb-3">
                The Annual license model requires an active license to use the
                software in development. You will need to renew your license if
                you wish to continue active development after your current
                license term expires.
              </CardDescription>
              <CardDescription className="pb-3">
                The license is perpetual in production so you don't need to
                renew your license if you have stopped active development with
                the commercial components.
              </CardDescription>
              <CardDescription>
                You can learn more about this in the EULA.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle className="pb-2">Maintenance and support</CardTitle>
              <CardDescription>
                With your purchase, you receive support and access to new
                versions for the duration of your subscription. You can{" "}
                <span className="text-blue-400">learn more about support</span>{" "}
                in the docs. Note that, except for critical issues, such as
                security flaws, we release bug fixes and other improvements on
                top of the latest version, instead of patching older versions.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="pb-2">Volume discounts</CardTitle>

              <CardDescription className="pb-3">
                The Pro plan is capped at 10 developers licensed; you do not
                need to pay for additional licenses for more than 10 developers.
                You can contact <span className="text-blue-400">sales</span> for
                a volume discount when licensing over 25 developers under the
                Premium plan.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
