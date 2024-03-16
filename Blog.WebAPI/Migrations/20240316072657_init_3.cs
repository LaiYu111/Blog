using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blog.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class init_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserDetail_Users_UserId",
                table: "UserDetail");

            migrationBuilder.DropIndex(
                name: "IX_UserDetail_UserId",
                table: "UserDetail");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserDetail");

            migrationBuilder.AddColumn<long>(
                name: "UserDetailId",
                table: "Users",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserDetailId",
                table: "Users",
                column: "UserDetailId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_UserDetail_UserDetailId",
                table: "Users",
                column: "UserDetailId",
                principalTable: "UserDetail",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_UserDetail_UserDetailId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_UserDetailId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserDetailId",
                table: "Users");

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "UserDetail",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_UserDetail_UserId",
                table: "UserDetail",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserDetail_Users_UserId",
                table: "UserDetail",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
