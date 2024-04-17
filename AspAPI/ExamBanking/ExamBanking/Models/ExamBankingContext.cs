using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ExamBanking.Models
{
    public partial class ExamBankingContext : DbContext
    {
        public ExamBankingContext()
        {
        }

        public ExamBankingContext(DbContextOptions<ExamBankingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Access> Accesses { get; set; } = null!;
        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Answer> Answers { get; set; } = null!;
        public virtual DbSet<Bank> Banks { get; set; } = null!;
        public virtual DbSet<Mode> Modes { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<Repo> Repos { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Section> Sections { get; set; } = null!;
        public virtual DbSet<Ticket> Tickets { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                              .SetBasePath(Directory.GetCurrentDirectory())
                              .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            IConfigurationRoot configuration = builder.Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("MyCnn"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Access>(entity =>
            {
                entity.ToTable("Access");

                entity.Property(e => e.Accessid).HasColumnName("accessid");

                entity.Property(e => e.Bankid).HasColumnName("bankid");

                entity.Property(e => e.Fromid)
                    .HasColumnType("decimal(38, 0)")
                    .HasColumnName("fromid");

                entity.Property(e => e.Message)
                    .HasMaxLength(1)
                    .HasColumnName("message");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Toid)
                    .HasColumnType("decimal(38, 0)")
                    .HasColumnName("toid");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.Accesses)
                    .HasForeignKey(d => d.Bankid)
                    .HasConstraintName("FK__Access__bankid__02084FDA");

                entity.HasOne(d => d.From)
                    .WithMany(p => p.AccessFroms)
                    .HasForeignKey(d => d.Fromid)
                    .HasConstraintName("FK__Access__fromid__00200768");

                entity.HasOne(d => d.To)
                    .WithMany(p => p.AccessTos)
                    .HasForeignKey(d => d.Toid)
                    .HasConstraintName("FK__Access__toid__01142BA1");
            });

            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Accid)
                    .HasName("PK__Account__A472ABF2EC9C6EFD");

                entity.ToTable("Account");

                entity.Property(e => e.Accid)
                    .HasColumnType("decimal(38, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("accid");

                entity.Property(e => e.Accname)
                    .HasMaxLength(255)
                    .HasColumnName("accname");

                entity.Property(e => e.Bankmode).HasColumnName("bankmode");

                entity.Property(e => e.Datejoin)
                    .HasColumnType("datetime")
                    .HasColumnName("datejoin");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Isnewbie).HasColumnName("isnewbie");

                entity.Property(e => e.ResetTokenExpires).HasColumnType("datetime");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.Property(e => e.Userpass)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("userpass");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.Roleid)
                    .HasConstraintName("FK__Account__roleid__693CA210");
            });

            modelBuilder.Entity<Answer>(entity =>
            {
                entity.HasKey(e => e.Ansid)
                    .HasName("PK__Answer__2626EE58B206F9C9");

                entity.ToTable("Answer");

                entity.Property(e => e.Ansid).HasColumnName("ansid");

                entity.Property(e => e.Anscontent).HasColumnName("anscontent");

                entity.Property(e => e.Ansstatus).HasColumnName("ansstatus");

                entity.Property(e => e.Quesid).HasColumnName("quesid");

                entity.HasOne(d => d.Ques)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.Quesid)
                    .HasConstraintName("FK__Answer__quesid__7A672E12");
            });

            modelBuilder.Entity<Bank>(entity =>
            {
                entity.ToTable("Bank");

                entity.Property(e => e.Bankid).HasColumnName("bankid");

                entity.Property(e => e.Accid)
                    .HasColumnType("decimal(38, 0)")
                    .HasColumnName("accid");

                entity.Property(e => e.Bankname)
                    .HasMaxLength(255)
                    .HasColumnName("bankname");

                entity.Property(e => e.Bankstatus).HasColumnName("bankstatus");

                entity.HasOne(d => d.Acc)
                    .WithMany(p => p.Banks)
                    .HasForeignKey(d => d.Accid)
                    .HasConstraintName("FK__Bank__accid__6C190EBB");
            });

            modelBuilder.Entity<Mode>(entity =>
            {
                entity.ToTable("Mode");

                entity.Property(e => e.Modeid).HasColumnName("modeid");

                entity.Property(e => e.Qmode)
                    .HasMaxLength(100)
                    .HasColumnName("qmode");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.Payid)
                    .HasName("PK__Payment__082D8EEBC6FBFC59");

                entity.ToTable("Payment");

                entity.Property(e => e.Payid).HasColumnName("payid");

                entity.Property(e => e.Accid)
                    .HasColumnType("decimal(38, 0)")
                    .HasColumnName("accid");

                entity.Property(e => e.Money).HasColumnName("money");

                entity.Property(e => e.Paycontent).HasColumnName("paycontent");

                entity.Property(e => e.Paydate)
                    .HasColumnType("date")
                    .HasColumnName("paydate");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.Acc)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.Accid)
                    .HasConstraintName("FK__Payment__accid__7D439ABD");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasKey(e => e.Quesid)
                    .HasName("PK__Question__8FF5F51D07EDBF6A");

                entity.ToTable("Question");

                entity.Property(e => e.Quesid).HasColumnName("quesid");

                entity.Property(e => e.Modeid).HasColumnName("modeid");

                entity.Property(e => e.Quescontent).HasColumnName("quescontent");

                entity.Property(e => e.Secid).HasColumnName("secid");

                entity.Property(e => e.Solution).HasColumnName("solution");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.HasOne(d => d.Mode)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.Modeid)
                    .HasConstraintName("FK__Question__modeid__76969D2E");

                entity.HasOne(d => d.Sec)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.Secid)
                    .HasConstraintName("FK__Question__secid__778AC167");
            });

            modelBuilder.Entity<Repo>(entity =>
            {
                entity.ToTable("Repo");

                entity.Property(e => e.Repoid).HasColumnName("repoid");

                entity.Property(e => e.Bankid).HasColumnName("bankid");

                entity.Property(e => e.Reponame)
                    .HasMaxLength(100)
                    .HasColumnName("reponame");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.Repos)
                    .HasForeignKey(d => d.Bankid)
                    .HasConstraintName("FK__Repo__bankid__70DDC3D8");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Role1)
                    .HasMaxLength(255)
                    .HasColumnName("role");
            });

            modelBuilder.Entity<Section>(entity =>
            {
                entity.HasKey(e => e.Secid)
                    .HasName("PK__Section__C25197F0B1A74C05");

                entity.ToTable("Section");

                entity.Property(e => e.Secid).HasColumnName("secid");

                entity.Property(e => e.Repoid).HasColumnName("repoid");

                entity.Property(e => e.Secname)
                    .HasMaxLength(100)
                    .HasColumnName("secname");

                entity.HasOne(d => d.Repo)
                    .WithMany(p => p.Sections)
                    .HasForeignKey(d => d.Repoid)
                    .HasConstraintName("FK__Section__repoid__73BA3083");
            });

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.ToTable("Ticket");

                entity.Property(e => e.Ticketid).HasColumnName("ticketid");

                entity.Property(e => e.Accid)
                    .HasColumnType("decimal(38, 0)")
                    .HasColumnName("accid");

                entity.Property(e => e.Bankid).HasColumnName("bankid");

                entity.Property(e => e.Expire).HasColumnName("expire");

                entity.Property(e => e.Startdate)
                    .HasColumnType("datetime")
                    .HasColumnName("startdate");

                entity.Property(e => e.Ticketmode).HasColumnName("ticketmode");

                entity.HasOne(d => d.Acc)
                    .WithMany(p => p.Tickets)
                    .HasForeignKey(d => d.Accid)
                    .HasConstraintName("FK__Ticket__accid__04E4BC85");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.Tickets)
                    .HasForeignKey(d => d.Bankid)
                    .HasConstraintName("FK__Ticket__bankid__05D8E0BE");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
